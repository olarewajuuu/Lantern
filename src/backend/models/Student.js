const mongoose = require('mongoose');


const studentSchema = new mongoose.Schema({
    fullname: {  type: String, required: true },
    phonenumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    location: { type: String, required: true },
    sponsor: { type: String, default: null},
    course: {
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
    }
}, { timestamps: true });



module.exports =  mongoose.model('Student', studentSchema);