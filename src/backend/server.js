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
app.use(cors({
  origin: ['https://lantern.academy'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400 // 24 hours
}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/reviews', reviewRoutes);
app.use('/api/tutors', tutorRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/newsletters', newsletterRoutes);

// Default Route
app.get('/', (req, res) => {
  res.send('CORS-enabled endpoint');
});

// Catch-all route for undefined endpoints
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Centralized error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
