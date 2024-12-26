const mongoose = requie('mongoose');

const reviewSchema = new mongoose.Schema({
    message: { type: String, required: true },
    rating: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
});


module.exports = mongoose.model('Review', reviewSchema);