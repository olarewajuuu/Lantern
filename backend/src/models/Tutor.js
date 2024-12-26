const mongoose = require('mongoose');

const tutorSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    phonenumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    course: { type: String, required: true },
    portfolio: { type: String },
    duration: { type: String, required: true },
    fee: { type: Number, required: true},
    uniqueTrait: { type: String },
    syllabus: { type: String },
    cv: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Tutor', tutorSchema);