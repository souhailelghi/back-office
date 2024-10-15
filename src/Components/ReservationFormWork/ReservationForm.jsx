import React, { useState } from 'react';
import axios from 'axios';

const ReservationForm = () => {
  const [reservationData, setReservationData] = useState({
    studentId: '',
    sportId: '',
    reservationDate: '',
    dayBooking: 0,
    hourStart: '',
    hourEnd: '',
    studentIdList: [],
  });

  // Function to format time to hh:mm:ss
  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:00`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formattedData = {
        ...reservationData,
        reservationDate: new Date(reservationData.reservationDate).toISOString(),
        hourStart: formatTime(reservationData.hourStart), // Ensure hourStart is formatted
        hourEnd: formatTime(reservationData.hourEnd), // Ensure hourEnd is formatted
        dateCreation: new Date().toISOString(),
        dateModification: new Date().toISOString()
      };

      const response = await axios.post('https://localhost:7125/api/Reservations/AddReservations', formattedData);

      console.log("Reservation created successfully:", response.data);
    } catch (error) {
      console.error("Error creating reservation:", error.response?.data || error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservationData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Student ID:</label>
        <input
          type="text"
          name="studentId"
          value={reservationData.studentId}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Sport ID:</label>
        <input
          type="text"
          name="sportId"
          value={reservationData.sportId}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Reservation Date:</label>
        <input
          type="date"
          name="reservationDate"
          value={reservationData.reservationDate}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Day Booking (Enum, 0-6 for Sunday-Saturday):</label>
        <input
          type="number"
          name="dayBooking"
          value={reservationData.dayBooking}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Hour Start (e.g. 10:00):</label>
        <input
          type="time"
          name="hourStart"
          value={reservationData.hourStart}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Hour End (e.g. 11:00):</label>
        <input
          type="time"
          name="hourEnd"
          value={reservationData.hourEnd}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Student ID List (comma-separated):</label>
        <input
          type="text"
          name="studentIdList"
          value={reservationData.studentIdList.join(',')}
          onChange={(e) => {
            const ids = e.target.value.split(',').map(id => id.trim());
            setReservationData(prevData => ({ ...prevData, studentIdList: ids }));
          }}
          required
        />
      </div>
      <button type="submit">Create Reservation</button>
    </form>
  );
};

export default ReservationForm;
