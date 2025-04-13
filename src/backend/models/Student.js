const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const studentSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    phoneNumber: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    location: { type: String },
    sponsor: { type: String, default: null },
    avatarUrl: { type: String, default: null },
    selectedCourse: {
      type: String,
      enum: [
        "Software Engineering",
        "ICAN",
        "GMAT",
        "Data Science/Analytics",
        "Backend Development",
        "IELTS",
        "Digital Marketing",
        "Project Management",
        "Virtual Assistant",
      ],
      required: null,
    },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String },
    loginTokens: [
      {
        token: { type: String },
        device: { type: String },
        loginDate: { type: Date },
        ipAddress: { type: String },
      },
    ],
    notificationPreferences: {
      push: { type: Boolean, default: false },
      email: { type: Boolean, default: false },
    },
    twoFactorEnabled: { type: Boolean, default: false },
    twoFactorSecret: { type: String },
    darkMode: { type: Boolean, default: false },
    lastLogin: { type: Date },
  },
  { timestamps: true }
);

studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  message: { type: String, required: true },
  type: { type: String, enum: ["info", "warning", "error"], default: "info" },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Notification = mongoose.model("Notification", notificationSchema);
const Student = mongoose.model("Student", studentSchema);

module.exports = { Notification, Student };
