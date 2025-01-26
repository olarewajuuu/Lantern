const express = require('express');
const cors = require('cors'); // Import CORS
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const reviewRoutes = require('./routes/reviewRoutes');
const tutorRoutes = require('./routes/tutorRoutes');
const studentRoutes = require('./routes/studentRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');
const connectDB = require('./config/db');

dotenv.config();
const PORT = process.env.PORT || 3500 || 5000;

connectDB();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api/reviews', reviewRoutes);
app.use('/api/tutors', tutorRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/newsletters', newsletterRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


// Use CORS to allow requests only from the specified frontend domain
app.use(cors({
    origin: 'https://lantern-pro.vercel.app', // Allow only this domain
    methods: 'GET,POST', // You can specify allowed methods if needed
    allowedHeaders: 'Content-Type,Authorization', // You can specify which headers are allowed if needed
}));

// Your other middleware and routes

app.post('/api/subscribe', (req, res) => {
    // Your subscription handling code here
    // This is where you'd handle the newsletter subscription logic
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${port}`);
});
