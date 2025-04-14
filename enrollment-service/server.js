const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());

const { connectRabbitMQ } = require('./utils/rabbitmq');


mongoose.connect('mongodb://mongo-enrollment:27017/oc-enrollment-service')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// Routes
const enrollmentRoutes = require('./routes/enrollments');
app.use('/api/enrollments', enrollmentRoutes);

app.listen(5002, () => console.log('Enrollment Service running on port 5002'));

connectRabbitMQ();