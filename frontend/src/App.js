import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import './App.css';

const API_BASE_URL = 'http://localhost:8080/api';

function App() {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', variant: 'success' });
  
  const [currentEvent, setCurrentEvent] = useState({
    id: null,
    title: '',
    description: '',
    dateTime: '',
    location: '',
    maxParticipants: 0
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/events`);
      setEvents(response.data);
    } catch (error) {
      showAlert('Error fetching events', 'danger');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentEvent({
      ...currentEvent,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`${API_BASE_URL}/events/${currentEvent.id}`, currentEvent);
        showAlert('Event updated successfully!', 'success');
      } else {
        await axios.post(`${API_BASE_URL}/events`, currentEvent);
        showAlert('Event created successfully!', 'success');
      }
      setShowModal(false);
      fetchEvents();
      resetForm();
    } catch (error) {
      showAlert('Error saving event', 'danger');
    }
  };

  const handleEdit = (event) => {
    setCurrentEvent({
      id: event.id,
      title: event.title,
      description: event.description,
      dateTime: event.dateTime,
      location: event.location,
      maxParticipants: event.maxParticipants
    });
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await axios.delete(`${API_BASE_URL}/events/${id}`);
        showAlert('Event deleted successfully!', 'success');
        fetchEvents();
      } catch (error) {
        showAlert('Error deleting event', 'danger');
      }
    }
  };

  const resetForm = () => {
    setCurrentEvent({
      id: null,
      title: '',
      description: '',
      dateTime: '',
      location: '',
      maxParticipants: 0
    });
    setIsEditing(false);
  };

  const showAlert = (message, variant) => {
    setAlert({ show: true, message, variant });
    setTimeout(() => setAlert({ ...alert, show: false }), 3000);
  };

  return (
    <Container className="mt-4">
      {alert.show && (
        <Alert variant={alert.variant} onClose={() => setAlert({ ...alert, show: false })} dismissible>
          {alert.message}
        </Alert>
      )}

      <h1 className="mb-4 text-primary">Event Management System</h1>
      <Button 
        variant="primary" 
        onClick={() => {
          resetForm();
          setShowModal(true);
        }}
        className="mb-4"
      >
        Create Event
      </Button>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Date & Time</th>
            <th>Location</th>
            <th>Max Participants</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map(event => (
            <tr key={event.id}>
              <td>{event.title}</td>
              <td>{event.description}</td>
              <td>{new Date(event.dateTime).toLocaleString()}</td>
              <td>{event.location}</td>
              <td>{event.maxParticipants}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleEdit(event)} className="me-2">
                  Edit
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(event.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => {
        setShowModal(false);
        resetForm();
      }}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit Event' : 'Create New Event'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control 
                type="text" 
                name="title" 
                value={currentEvent.title} 
                onChange={handleInputChange} 
                required 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control 
                as="textarea" 
                name="description" 
                value={currentEvent.description} 
                onChange={handleInputChange} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date & Time</Form.Label>
              <Form.Control 
                type="datetime-local" 
                name="dateTime" 
                value={currentEvent.dateTime} 
                onChange={handleInputChange} 
                required 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control 
                type="text" 
                name="location" 
                value={currentEvent.location} 
                onChange={handleInputChange} 
                required 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Max Participants</Form.Label>
              <Form.Control 
                type="number" 
                name="maxParticipants" 
                value={currentEvent.maxParticipants} 
                onChange={handleInputChange} 
                required 
                min="1"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {isEditing ? 'Update Event' : 'Save Event'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default App;
