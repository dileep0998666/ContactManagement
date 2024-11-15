const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Set the port from the environment variable or default to 3000
const PORT = process.env.PORT || 3000;

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Database connection error:', error));

const contactRoutes = require('./routes/contactRouter');
app.use('/api', contactRoutes);

// Start the server on the specified port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
