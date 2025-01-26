const express = require('express');
const cors = require('cors'); // Import CORS
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const reviewRoutes = require('./routes/reviewRoutes');
const tutorRoutes = require('./routes/tutorRoutes');
const studentRoutes = require('./routes/studentRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');
const connectDB = require('./config/db'); // Ensure db config is correct

dotenv.config();
const PORT = process.env.PORT || 3500;

const app = express();

// Connect to database
connectDB().catch(err => {
    console.error('Database connection failed:', err);
    process.exit(1); // Exit the application if DB connection fails
});

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/reviews', reviewRoutes);
app.use('/api/tutors', tutorRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/newsletters', newsletterRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
