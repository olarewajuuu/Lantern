const mongoose = require('mongoose');

const SubscribeSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
});

module.exports = mongoose.model('Subscribe', SubscribeSchema);