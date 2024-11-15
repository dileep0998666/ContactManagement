const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { 
    type: String, 
    required: true,
    validate: {
      validator: function(value) {
        // Check if the phone number contains exactly 10 digits and only numbers
        return /^\d{10}$/.test(value);
      },
      message: 'Phone number must be exactly 10 digits and contain only numbers'
    }
  },
  company: String,
  jobTitle: String
});

module.exports = mongoose.model('Contact', contactSchema);
