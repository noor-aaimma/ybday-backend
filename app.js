const express = require('express');
const cors = require('cors');
const path = require('path');
const eventRoutes = require('./routes/eventRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/events', eventRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('🎉 YBday API is running...');
});

module.exports = app;
