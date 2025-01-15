const Review = require('../models/Review');

exports.submitReview = async (req, res) => {
    try {
        // collect messages from request body
        const { message } = req.body;
        if (!message){
            return res.status(400).json({ error: 'Message is required' });
        }
        // new reviews associated with the authennticated user
        const review = await Review.create({ message });
        await review.save();
        
        res.status(201).json({ message: 'Review Submitted', review });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};