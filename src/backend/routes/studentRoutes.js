const express = require("express");

const {
  submitStudentDetails,
  verifyStudentEmail,
  loginStudent,
  logoutStudent,
  authenticateToken,
  toggleTheme,
  toggleEmailNotifications,
  togglePushNotifications,
  toggleTwoFactorAuthentications,
  updateStudentInfo,
} = require("../controllers/studentController");
const authenticateStudent = require("../middlewares/authMiddleWare");

const router = express.Router();

// Registration route with validation
router.post("/submit", submitStudentDetails);
router.post("/login", loginStudent);
router.post("/logout", authenticateStudent, logoutStudent);
router.post("/authToken", authenticateToken);
router.post("/toggleTheme/:studentId", toggleTheme);
router.post(
  "/toggleTwoFactorEnabled/:studentId",
  toggleTwoFactorAuthentications
);
router.post("/toggleEmailNotifications/:studentId", toggleEmailNotifications);
router.post("/togglePushNotifications/:studentId", togglePushNotifications);
router.get("/verify-email/:token", verifyStudentEmail);
router.post("/updateStudentInfo/:studentId", updateStudentInfo);

module.exports = router;
