const jwt = require("jsonwebtoken");
const { Student } = require("../models/Student");

const authenticateStudent = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    // Debug raw Authorization header
    console.log("Authorization header:", JSON.stringify(authHeader));

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Token missing or malformed" });
    }

    const token = authHeader.split(" ")[1];

    // Optional: further check token format
    const parts = token.split(".");
    if (parts.length !== 3) {
      console.log("Malformed token parts:", parts);
      return res.status(401).json({ error: "Invalid token format" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Extracted token:", token);
    console.log("Decoded token:", decoded);

    const student = await Student.findOne({
      _id: decoded.studentId,
      "loginTokens.token": token,
    });

    if (!student) {
      return res
        .status(401)
        .json({ error: "Student not found or token invalid" });
    }

    req.token = token;
    req.student = student;
    next();
  } catch (err) {
    console.error("Authentication error:", err.message);
    return res.status(401).json({ error: "Unauthorized access" });
  }
};

module.exports = authenticateStudent;
