const mongoose = require('mongoose');


const studentSchema = new mongoose.Schema({
    fullName: {  type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    location: { type: String, required: true },
    sponsor: { type: String, default: null},
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
            "Virtual Asistant"
        ],
        required: true
    },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String }
}, { timestamps: true });



module.exports =  mongoose.model('Student', studentSchema);