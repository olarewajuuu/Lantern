require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');


// we initialize the app
const app = express();

// middleware to parse JSON requests
app.use(express.json());

// connect to mongoDB
connectDB();

// middleware 
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/review', require('./routes/reviewRoutes'));
app.use('/api/tutor', require('./routes/tutorRoutes'));


// start the server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));