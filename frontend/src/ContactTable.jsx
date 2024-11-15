import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper } from '@mui/material';
import axios from 'axios';
import ContactForm from './ContactForm';

const ContactTable = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    // Fetch contacts when the component mounts
    axios.get('http://localhost:3000/api/contacts')
      .then((response) => setContacts(response.data))
      .catch((error) => console.error('Error fetching contacts:', error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/api/contacts/${id}`)
      .then(() => {
        setContacts(contacts.filter((contact) => contact._id !== id));
      })
      .catch((error) => console.error('Error deleting contact:', error));
  };

  const handleEdit = (contact) => {
    setSelectedContact(contact);
    setIsEditMode(true);
  };

  const handleAddContact = (newContact) => {
    axios.post('http://localhost:3000/api/contacts', newContact)
      .then((response) => {
        setContacts([...contacts, response.data]);
      })
      .catch((error) => console.error('Error adding contact:', error));
  };

  const handleUpdateContact = (updatedContact) => {
    axios.put(`http://localhost:3000/api/contacts/${selectedContact._id}`, updatedContact)
      .then((response) => {
        setContacts(
          contacts.map((contact) =>
            contact._id === selectedContact._id ? response.data : contact
          )
        );
        setIsEditMode(false);
        setSelectedContact(null);
      })
      .catch((error) => console.error('Error updating contact:', error));
  };

  return (
    <div>
      <ContactForm
        contact={selectedContact}
        onSubmit={isEditMode ? handleUpdateContact : handleAddContact}
        isEditMode={isEditMode}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Job Title</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.map((contact) => (
              <TableRow key={contact._id}>
                <TableCell>{contact.firstName}</TableCell>
                <TableCell>{contact.lastName}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.phoneNumber}</TableCell>
                <TableCell>{contact.company}</TableCell>
                <TableCell>{contact.jobTitle}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(contact)} variant="outlined" color="primary">
                    Edit
                  </Button>
                  <Button onClick={() => handleDelete(contact._id)} variant="outlined" color="secondary">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ContactTable;
