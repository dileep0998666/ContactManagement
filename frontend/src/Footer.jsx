import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Grid } from '@mui/material';

const Footer = () => {
  const [feedback, setFeedback] = useState('');

  const handleChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Here, we'll send the data to Formspree
    // Replace 'your-form-id' with your Formspree form ID.
    const formData = new FormData();
    formData.append('feedback', feedback);

    fetch('https://formspree.io/f/your-form-id', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        alert('Feedback sent successfully!');
        setFeedback(''); // Clear feedback input after successful submission
      })
      .catch((error) => {
        alert('Error sending feedback. Please try again later.');
      });
  };

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body1" align="center">
          © {new Date().getFullYear()} Erino. All rights reserved.
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          Empowering businesses with efficient contact management solutions.
        </Typography>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
          <Grid container spacing={2} alignItems="center">
            {/* Feedback Text Field */}
            <Grid item xs={12} sm={9}>
              <TextField
                label="Your Feedback"
                variant="outlined"
                fullWidth
                multiline
                rows={1}  // Decrease the height of the text area
                value={feedback}
                onChange={handleChange}
                required
                sx={{
                  mb: 2,
              
                  maxWidth: '3050px', // Reduce the width of the form even further
                }}
              />
            </Grid>
            
            {/* Submit Button */}
            <Grid item xs={12} sm={3}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                    width: '100%',
                    height: '150%',
                    maxWidth: '120px', // Reduce button width for a more compact look
                  }}
                >
                  Send
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Box>
  );
};

export default Footer;
