import React, { useState } from 'react';
import axios from 'axios';

const AddReservationForm = () => {
  const [formData, setFormData] = useState({
    studentId: '',
    sportId: '',
    reservationDate: '',
    dayBooking: 1, // Adjust as needed
    hourStart: '',
    hourEnd: '',
    studentIdList: [],
    dateCreation: new Date().toISOString(),
    dateModification: new Date().toISOString(),
  });
  
  const [responseMessage, setResponseMessage] = useState('');
  const authToken = 'your-auth-token'; // Replace with your actual token logic

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://localhost:7125/api/Reservations/AddReservations',
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Pass the token here
            'Content-Type': 'application/json',
          },
        }
      );
      setResponseMessage('Reservation added successfully');
    } catch (error) {
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        const message = errorData.title || 'An error occurred.';
        setResponseMessage(message);
      } else {
        setResponseMessage('Failed to add reservation. Check your input.');
      }
    }
  };

  return (
    <div>
      <h1>Add Reservation</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Student ID:</label>
          <input
            type="text"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Sport ID:</label>
          <input
            type="text"
            name="sportId"
            value={formData.sportId}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Reservation Date:</label>
          <input
            type="datetime-local"
            name="reservationDate"
            value={formData.reservationDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Day Booking:</label>
          <input
            type="number"
            name="dayBooking"
            value={formData.dayBooking}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Hour Start:</label>
          <input
            type="time"
            name="hourStart"
            value={formData.hourStart}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Hour End:</label>
          <input
            type="time"
            name="hourEnd"
            value={formData.hourEnd}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Student ID List:</label>
          <input
            type="text"
            name="studentIdList"
            placeholder="Comma-separated IDs"
            onChange={(e) => 
              setFormData({
                ...formData,
                studentIdList: e.target.value.split(',').map(id => id.trim()),
              })
            }
          />
        </div>
        <button type="submit">Add Reservation</button>
      </form>
      {/* Response Message */}
      {typeof responseMessage === 'string' && <p>{responseMessage}</p>}
    </div>
  );
};

export default AddReservationForm;
