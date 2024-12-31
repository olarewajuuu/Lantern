const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    message: { 
        type: String, 
        required: true, 
        trim: true 
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
}, { timestamps: true }
);


module.exports = mongoose.model('Review', reviewSchema);