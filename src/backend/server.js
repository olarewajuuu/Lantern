const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const reviewRoutes = require('./routes/reviewRoutes');
const tutorRoutes = require('./routes/tutorRoutes');
const studentRoutes = require('./routes/studentRoutes');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
const PORT = process.env.PORT;

connectDB(); // Connect to MongoDB database

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve static files

app.use('/api/reviews', reviewRoutes);
app.use('/api/tutors', tutorRoutes);
app.use('/api/students', studentRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});