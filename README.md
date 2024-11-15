###Contact Management Application

## Overview

simple contact management application designed to help businesses keep track of their contacts. This web app allows users to add, edit, and delete contact details securely. It is built with React, Node.js, and MongoDB, providing a modern interface and a cloud-based database solution.

## Features

- Add, edit, and delete contacts with details like name, email, phone number, job title, and company.
- Responsive design that works well on both mobile and desktop.
- Feedback form for users to send suggestions or report issues.

## Technologies

- **Frontend**: React, Material UI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas (Cloud Database)
- **Deployment**: GitHub

## Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) (includes npm)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account

### Steps to Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/dileep0998666/ErinoCode.git


### Project Structure   

/ErinoCode
|-- /frontend         # React frontend code
|-- /backend         # Express backend code
|-- .env            # Environment variables
|-- README.md        # This file

### Required CMDS For Frontend

If Node.js is not installed, download and install it from the official site.
    ```bash

     npm install
     npm install @mui/material @emotion/react @emotion/styled
     npm install axios
     npm install react-icons 
     npm start
     npm run dev



### Required CMDS For Backend Server
        
         npm install express mongoose cors dotenv
         node server.js


i have used mangodb atlass database in .env i have given credentials, if you want your own 
replace with your credentials 
```bash
   MONGODB_URI=mongodb+srv://userName:passWord@cluster0.ys1vrmongodb.net/dataBaseName?retryWrites=true&w=majority
   PORT=3000 
   ```




### Challenges i faced 

## 1:
Challenge: Initially, I had issues when setting up the feedback form submission. The form was supposed to send feedback to a third-party service (Formspree), but I wasn't receiving the feedback in my email. The requests would fail due to incorrect form data or wrong form IDs.

Solution: I thoroughly checked the Formspree documentation and verified that the form endpoint and form data were configured correctly. I also added error handling in the frontend to catch failed submissions, which improved the user experience. Additionally, I tested the form with simpler data first, which helped identify and fix the issue.
 ## 2:
Challenge: Designing a responsive UI was initially difficult. Some components didn’t look good on mobile devices, and certain elements were either too small or too large on different screen sizes.

Solution: I used Material UI's built-in grid system and sx prop to ensure the layout was responsive. I also tested the design across various screen sizes using Chrome’s developer tools and made necessary adjustments to padding, margins, and font sizes. I focused on building a flexible layout using percentages and breakpoints.
