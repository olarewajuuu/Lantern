const { Student, Notification } = require("../models/Student");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const useragent = require("useragent");
const { validateStudentInput } = require("../validators/authValidator");

// Submit Student Details
exports.submitStudentDetails = async (req, res) => {
  const validationErrors = validateStudentInput(req.body);
  if (Object.keys(validationErrors).length > 0) {
    return res.status(400).json({ errors: validationErrors });
  }

  try {
    const {
      fullName,
      phoneNumber,
      email,
      location,
      sponsor,
      selectedCourse,
      password,
    } = req.body;

    // Validate required fields
    if (!fullName || !email || !password) {
      return res
        .status(400)
        .json({ error: "All required fields must be filled" });
    }

    // Check if email already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Generate email verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");

    // Create the student
    const student = new Student({
      fullName,
      phoneNumber,
      email,
      location,
      password,
      sponsor: sponsor || null,
      selectedCourse,
      isVerified: false,
      verificationToken,
    });

    // Create the verification URL
    const verificationUrl = `${process.env.BACKEND_URL}/api/students/verify-email/${verificationToken}`;

    // Send verification email
    const from = process.env.STUDENT_EMAIL; // Sender email for students
    const subject = "Please Verify Your Email";
    const message = `Hi ${fullName},\n\nPlease verify your email by clicking the link below:\n${verificationUrl}`;

    await sendEmail(email, subject, message, from);
    await student.save();

    res.status(201).json({
      message:
        "Student form submitted. Please check your email to verify your account.",
    });
  } catch (error) {
    console.error("Error submitting student form:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while submitting the form." });
  }
};

exports.verifyStudentEmail = async (req, res) => {
  try {
    const { token } = req.params;

    // Find the student by the token
    const student = await Student.findOne({ verificationToken: token });

    if (!student) {
      return res.status(400).json({ error: "Invalid or expired token." });
    }

    // Mark the student as verified
    student.isVerified = true;
    student.verificationToken = null; // Clear the token
    await student.save();

    // Send a success response
    res.status(200).json({ message: "Email verified successfully!" });

    // Send notification email to the student
    const subject = "Email Verified Successfully";
    const message = `Hi ${student.fullName},\n\nYour email has been verified successfully. You can now proceed.`;
    await sendEmail(student.email, subject, message);
  } catch (error) {
    console.error("Error verifying email:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred during email verification." });
  }
};

exports.loginStudent = async (req, res) => {
  try {
    const { email, password, ipAddress } = req.body; // Expecting ipAddress in the request body

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required." });
    }

    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    if (!student.isVerified) {
      return res
        .status(403)
        .json({ error: "Please verify your email before logging in." });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    if (student.loginTokens.length >= 3) {
      return res.status(403).json({
        error:
          "You have too many devices logged in. Please log out from some devices and try again.",
      });
    }

    const token = jwt.sign(
      { studentId: student._id, email: student.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // Get the device information from the user-agent header
    const agent = useragent.parse(req.headers["user-agent"]);
    const device = agent.device.family || "Unknown Device"; // Default to "Unknown Device" if no device info is found

    // Store the token along with device and login date
    const loginToken = {
      token,
      device: device,
      loginDate: new Date(),
      ipAddress: ipAddress || "Unknown IP", // Default to "Unknown IP"
    };

    student.loginTokens.push(loginToken);
    student.lastLogin = new Date();

    await student.save();

    if (student.notificationPreferences.email) {
      const from = process.env.STUDENT_EMAIL; // Sender email for students
      const subject = "New Device Login Notification";
      const message = `Hi ${student.fullName},\n\nWe noticed a login to your account from a new device. 
      If this was you, no further action is needed.\n\nHowever, if you did not initiate this login, please secure your account immediately by changing your password.
      \n\nThank you,\nYour Security Team`;
      await sendEmail(email, subject, message, from);
    }

    if (student.notificationPreferences.push) {
      await sendNotification(
        student._id,
        `Hi ${student.fullName}, We noticed a login to your account from a new device.`,
        "info"
      );
    }

    // Get the latest login information (device and ipAddress)
    const latestLogin = student.loginTokens[student.loginTokens.length - 1];
    const latestDevice = latestLogin.device;
    const latestIpAddress = latestLogin.ipAddress;

    res.status(200).json({
      message: "New login successful",
      token,
      student: {
        id: student._id,
        fullName: student.fullName,
        email: student.email,
        lastLogin: student.lastLogin, // Optional to return this
        device: latestDevice, // Latest device from loginTokens
        ipAddress: latestIpAddress, // Latest IP address from loginTokens
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ error: "Login failed due to a server error." });
  }
};

exports.logoutStudent = async (req, res) => {
  try {
    const token = req.token;
    const student = req.student;

    if (!student || !token) {
      return res
        .status(400)
        .json({ message: "Missing student or token in request" });
    }

    student.loginTokens = student.loginTokens.filter(
      (login) => login.token !== token
    );

    await student.save();

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error.message);
    res.status(500).json({ message: "Logout failed. Please try again later." });
  }
};

exports.authenticateToken = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ error: "Token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const student = await Student.findOne({
      _id: decoded.studentId,
      "loginTokens.token": token,
    });

    if (!student) {
      return res.status(401).json({ error: "Please authenticate" });
    }

    req.student = student;
    req.token = token;
    res.status(200).json({ message: "Token authenticated" });
    // next();
  } catch (err) {
    res.status(401).json({ error: "Please authenticate" });
  }
};

exports.toggleTheme = async (req, res) => {
  try {
    const { studentId } = req.params;
    if (!studentId) {
      return res.status(401).json({ message: "Student's ID is required" });
    }
    const student = await Student.findById(studentId);

    if (!student) {
      return res
        .status(402)
        .json({ message: "Student not found, invalid ID data" });
    }

    student.darkMode = !student.darkMode;
    await student.save();

    if (student.notificationPreferences.email) {
      const from = process.env.STUDENT_EMAIL;
      const subject = "Dark Mode Setting Changed";
      const message = `Hi ${
        student.fullName
      },\n\nWe wanted to let you know that your dark mode setting has been ${
        student.darkMode ? "enabled" : "disabled"
      } successfully.\n\nIf this was not you, please review your account settings for security.\n\nThank you,\nYour Security Team`;
      await sendEmail(student.email, subject, message, from);
    }

    if (student.notificationPreferences.push) {
      await sendNotification(
        student._id,
        `Hi ${student.fullName}, Your dark mode setting has been ${
          student.darkMode ? "enabled" : "disabled"
        }.`,
        "info"
      );
    }

    res.status(200).json({
      message: `Dark mode is now ${student.darkMode ? "ON" : "OFF"}`,
      darkMode: student.darkMode,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error toggling dark mode", error: err.message });
  }
};

exports.toggleEmailNotifications = async (req, res) => {
  try {
    const { studentId } = req.params;
    if (!studentId) {
      return res.status(401).json({ message: "Student's ID is required" });
    }
    const student = await Student.findById(studentId);

    if (!student) {
      return res
        .status(402)
        .json({ message: "Student not found, invalid ID data" });
    }

    student.notificationPreferences.email =
      !student.notificationPreferences.email;
    await student.save();

    if (student.notificationPreferences.push) {
      await sendNotification(
        student._id,
        `Hi ${
          student.fullName
        }, We have updated your email notification preference. Email notifications are now ${
          student.notificationPreferences.email ? "ON" : "OFF"
        }.`,
        "info"
      );
    }

    // Send an email if email notifications are enabled
    if (student.notificationPreferences.email) {
      const from = process.env.STUDENT_EMAIL; // Sender email for students
      const subject = "Email Notification Preference Changed";
      const message = `Hi ${
        student.fullName
      },\n\nWe have updated your email notification preference. Email notifications are now ${
        student.notificationPreferences.email ? "enabled" : "disabled"
      }.\n\nIf this was not you, please review your account settings for security.\n\nThank you,\nYour Security Team`;
      await sendEmail(student.email, subject, message, from);
    }

    res.status(200).json({
      message: `Email notifications are ${
        student.notificationPreferences.email ? "ON" : "OFF"
      }`,
      emailNotificationMode: student.notificationPreferences.email,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error toggling email notification mode",
      error: err.message,
    });
  }
};

exports.togglePushNotifications = async (req, res) => {
  try {
    const { studentId } = req.params;
    if (!studentId) {
      return res.status(401).json({ message: "Student's ID is required" });
    }
    const student = await Student.findById(studentId);

    if (!student) {
      return res
        .status(402)
        .json({ message: "Student not found, invalid ID data" });
    }

    // Toggle push notification preference
    student.notificationPreferences.push =
      !student.notificationPreferences.push;

    // Save the student object
    await student.save();

    if (student.notificationPreferences.push) {
      await sendNotification(
        student._id,
        `Hi ${
          student.fullName
        }, We have updated your push notification preference. Push notifications are now ${
          student.notificationPreferences.push ? "ON" : "OFF"
        }.`,
        "info"
      );
    }

    // Send an email if email notifications are enabled
    if (student.notificationPreferences.email) {
      const from = process.env.STUDENT_EMAIL; // Sender email for students
      const subject = "Push Notification Preference Changed";
      const message = `Hi ${
        student.fullName
      },\n\nWe have updated your push notification preference. Push notifications are now ${
        student.notificationPreferences.push ? "enabled" : "disabled"
      }.\n\nIf this was not you, please review your account settings for security.\n\nThank you,\nYour Security Team`;
      await sendEmail(student.email, subject, message, from);
    }

    // Respond with the updated status
    res.status(200).json({
      message: `Push notifications are ${
        student.notificationPreferences.push ? "ON" : "OFF"
      }`,
      PushNotificationMode: student.notificationPreferences.push,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error toggling Push Notification mode",
      error: err.message,
    });
  }
};

exports.toggleTwoFactorAuthentications = async (req, res) => {
  try {
    const { studentId } = req.params;
    if (!studentId) {
      return res.status(401).json({ message: "Student's ID is required" });
    }
    const student = await Student.findById(studentId);

    if (!student) {
      return res
        .status(402)
        .json({ message: "Student not found, invalid ID data" });
    }

    student.twoFactorEnabled = !student.twoFactorEnabled;
    await student.save();

    // Send a push notification if push notifications are enabled
    if (student.notificationPreferences.push) {
      await sendNotification(
        student._id,
        `Hi ${
          student.fullName
        }, Your two-factor authentication preference has been ${
          student.twoFactorEnabled ? "enabled" : "disabled"
        }.`,
        "info"
      );
    }

    // Send an email if email notifications are enabled
    if (student.notificationPreferences.email) {
      const from = process.env.STUDENT_EMAIL; // Sender email for students
      const subject = "Two-Factor Authentication Preference Changed";
      const message = `Hi ${
        student.fullName
      },\n\nYour two-factor authentication preference has been ${
        student.twoFactorEnabled ? "enabled" : "disabled"
      }.\n\nIf this was not you, please review your account settings for security.\n\nThank you,\nYour Security Team`;
      await sendEmail(student.email, subject, message, from);
    }

    res.status(200).json({
      message: `Two Factor Authenticaion is now ${
        student.twoFactorEnabled ? "ENABLED" : "DISABLED"
      }`,
      twoFactorEnabled: student.twoFactorEnabled,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error toggling dark mode", error: err.message });
  }
};

const sendNotification = async (userId, message, type = "info") => {
  try {
    const notification = new Notification({
      userId,
      message,
      type,
    });

    await notification.save();
    console.log("Notification sent:", { userId, message, type });
  } catch (error) {
    console.error("Error sending notification:", error.message);
  }
};

exports.getStudentData = async (req, res) => {
  try {
    const { studentId } = req.params;
    const foundStudent = await Student.findById(studentId);

    if (!foundStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Return the student data if found
    return res.status(200).json({
      message: "Student data retrieved successfully",
      student: foundStudent,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message }); // Return error if something goes wrong
  }
};

exports.updateStudentInfo = async (req, res) => {
  try {
    const { studentId } = req.params;
    const {
      fullName,
      phoneNumber,
      password,
      location,
      sponsor,
      avatarUrl,
      selectedCourse,
    } = req.body;

    if (!studentId) {
      return res.status(400).json({ message: "Student's ID is required" });
    }

    if (selectedCourse) {
      const validCourses = [
        "Software Engineering",
        "ICAN",
        "GMAT",
        "Data Science/Analytics",
        "Backend Development",
        "IELTS",
        "Digital Marketing",
        "Project Management",
        "Virtual Assistant",
      ];

      if (!validCourses.includes(selectedCourse)) {
        return res
          .status(400)
          .json({ message: `Invalid course selection: ${selectedCourse}` });
      }
    }

    const student = await Student.findById(studentId);
    if (!student) {
      return res
        .status(401)
        .json({ message: "Student not found or Invalid ID" });
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      student.password = hashedPassword;
    }

    if (fullName) student.fullName = fullName;
    if (phoneNumber) student.phoneNumber = phoneNumber;
    if (location) student.location = location;
    if (sponsor) student.sponsor = sponsor;
    if (avatarUrl) student.avatarUrl = avatarUrl;
    if (selectedCourse) student.selectedCourse = selectedCourse;

    await student.save();

    const updatedStudent = student.toObject();
    delete updatedStudent.password;

    if (student.notificationPreferences.email) {
      const from = process.env.STUDENT_EMAIL;
      const subject = "Your Personal Information has been Updated";
      const message = `Hi ${student.fullName},\n\nYour personal information has been successfully updated. 
      If this wasn't you, please review your account settings.\n\nThank you,\nYour Security Team`;

      await sendEmail(student.email, subject, message, from);
    }

    if (student.notificationPreferences.push) {
      await sendNotification(
        student._id,
        `Hi ${student.fullName}, Your personal information has been successfully updated.`,
        "info"
      );
    }

    return res.status(200).json({
      message: "Student information updated successfully",
      student: updatedStudent,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
