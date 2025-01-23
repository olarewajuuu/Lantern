const mongoose = require('mongoose');

const subscribeSchema = new mongoose.Schema({
    email: { type: String }
}, { timestamp: true });


module.exports = mongoose.model('Subscription', subscribeSchema);