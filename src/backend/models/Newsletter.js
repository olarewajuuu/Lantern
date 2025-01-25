const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now }
}, { timestamp: true });


module.exports = mongoose.model('Subscription', newsletterSchema);