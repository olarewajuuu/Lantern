const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const reviewRoutes = require('./routes/reviewRoutes');
const tutorRoutes = require('./routes/tutorRoutes');
const studentRoutes = require('./routes/studentRoutes');
const cors = require('cors');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve static files

app.use('/api/reviews', reviewRoutes);
app.use('/api/tutors', tutorRoutes);
app.use('/api/students', studentRoutes);

mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(process.env.PORT || 5000, () => console.log('Server running on port 5000'));
    })
    .catch(err => console.log(err));
