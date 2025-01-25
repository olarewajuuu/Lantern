const mongoose = require('mongoose');

const tutorSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    course: { type: String, required: true },
    portfolio: { type: String },
    duration: { type: String, required: true },
    fee: { type: Number, required: true},
    uniqueInfo: { type: String },
    syllabusFile: { type: String },
    cvFile: { type: String },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Tutor', tutorSchema);