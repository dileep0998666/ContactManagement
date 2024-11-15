import React, { useEffect, useState } from 'react';
import { TextField, Grid, Button, Alert, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';

const predefinedJobTitles = ['Manager', 'Engineer', 'Developer', 'Designer', 'Salesperson', 'Other'];

const ContactForm = ({ contact, onSubmit, isEditMode }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    company: '',
    jobTitle: ''
  });
  const [phoneError, setPhoneError] = useState('');
  const [formError, setFormError] = useState(false);
  const [isOtherJobTitle, setIsOtherJobTitle] = useState(false);
  const [duplicateWarning, setDuplicateWarning] = useState('');

  useEffect(() => {
    if (isEditMode && contact) {
      setFormData({
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.email,
        phoneNumber: contact.phoneNumber,
        company: contact.company || '',
        jobTitle: contact.jobTitle || ''
      });
      setIsOtherJobTitle(contact.jobTitle && !predefinedJobTitles.includes(contact.jobTitle));
    }
  }, [isEditMode, contact]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));

    if (name === 'phoneNumber') {
      if (/^\d{0,10}$/.test(value)) {
        setPhoneError(value.length === 10 ? '' : 'Phone number must be exactly 10 digits');
      } else {
        setPhoneError('Phone number must contain only 10 digits');
      }
    }

    if (name === 'jobTitle' && value !== 'Other') {
      setIsOtherJobTitle(false);
    }
  };

  const handleJobTitleChange = (e) => {
    const value = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      jobTitle: value === 'Other' ? '' : value
    }));
    setIsOtherJobTitle(value === 'Other');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post('/check-duplicates', {
        email: formData.email,
        phoneNumber: formData.phoneNumber,
      });

      if (data.emailExists) {
        setDuplicateWarning('This email is already in use.');
        return;
      }

      if (data.phoneExists) {
        setDuplicateWarning('This phone number is already in use.');
        return;
      }

      setDuplicateWarning('');
      onSubmit(formData);
    } catch (error) {
      console.error('Error checking duplicates:', error);
      setDuplicateWarning('Same email or phone number already exists.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            fullWidth
            required
            error={Boolean(phoneError)}
            helperText={phoneError}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth required>
            <InputLabel>Job Title</InputLabel>
            <Select
              value={isOtherJobTitle ? 'Other' : formData.jobTitle}
              onChange={handleJobTitleChange}
              label="Job Title"
            >
              {predefinedJobTitles.map((title) => (
                <MenuItem key={title} value={title}>
                  {title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {isOtherJobTitle && (
            <TextField
              label="Custom Job Title"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              fullWidth
              required
              sx={{ marginTop: 2 }}
            />
          )}
        </Grid>
        {duplicateWarning && (
          <Grid item xs={12}>
            <Alert severity="warning">{duplicateWarning}</Alert>
          </Grid>
        )}
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {isEditMode ? 'Update Contact' : 'Add Contact'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ContactForm;
