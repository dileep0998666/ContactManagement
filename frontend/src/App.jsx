import React from 'react'
import { CssBaseline, Container, Box, Typography } from '@mui/material'
import ContactTable from './ContactTable'
import Header from './header'
import Footer from './Footer'
import './App.css'

function App() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <CssBaseline />
      <Header />
      <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="lg">
        <Typography 
          variant="h3" 
          component="h1" 
          sx={{ 
            fontWeight: 600, 
            fontSize: '2.5rem', 
            color: 'black', 
            textAlign: 'center', 
            mb: 4 
          }}
        >
          Manage Your Contacts Effectively
        </Typography>
        <ContactTable />
      </Container>
      <Footer />
    </Box>
  )
}

export default App
