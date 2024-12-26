const Review = require('../models/Review');

exports.submitReview = async (req, res) => {
    try {
        const review = await Review.create({ ...req.body, user: req.user.id });
        res.status(201).json({ message: 'Review Submitted', review });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};