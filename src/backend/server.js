const express = require('express');
const cors = require('cors'); // Import CORS
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const reviewRoutes = require('./routes/reviewRoutes');
const tutorRoutes = require('./routes/tutorRoutes');
const studentRoutes = require('./routes/studentRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');
const connectDB = require('./config/db'); // Ensure db config is correct



const app = express();
const PORT = process.env.PORT || 3500;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to database
connectDB().catch(err => {
  console.error('Database connection failed:', err);
  process.exit(1); // Exit the application if DB connection fails
});

// Default Route
app.get('/', (req, res) => {
  res.send('CORS-enabled endpoint');
});

app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/reviews', reviewRoutes);
app.use('/api/tutors', tutorRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/newsletters', newsletterRoutes);


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
