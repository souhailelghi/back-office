import React, { useState } from 'react';
import axios from 'axios';

const AddReservation = () => {
    const [studentId, setStudentId] = useState('');
    const [sportId, setSportId] = useState('');
    const [reservationDate, setReservationDate] = useState('');
    const [dayBooking, setDayBooking] = useState(0);
    const [hourStart, setHourStart] = useState('');
    const [hourEnd, setHourEnd] = useState('');
    const [studentIdList, setStudentIdList] = useState(['']);
    const [token, setToken] = useState(''); // New state for token
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const reservationData = {
            studentId: studentId,
            sportId: sportId,
            reservationDate: reservationDate,
            dayBooking: dayBooking,
            hourStart: hourStart,
            hourEnd: hourEnd,
            studentIdList: studentIdList.filter(id => id),
            dateCreation: new Date().toISOString(),
            dateModification: new Date().toISOString(),
        };

        try {
            const response = await axios.post("https://localhost:7125/api/Reservations/AddReservations", reservationData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Use the token from the input
                },
            });

            setSuccess(response.data);
            setError('');
        } catch (err) {
            setError(err.response ? err.response.data : 'Failed to add reservation.');
            setSuccess('');
        }
    };

    const addStudentIdField = () => {
        setStudentIdList([...studentIdList, '']);
    };

    const handleStudentIdChange = (index, value) => {
        const newStudentIdList = [...studentIdList];
        newStudentIdList[index] = value;
        setStudentIdList(newStudentIdList);
    };

    return (
        <div>
            <h2>Add Reservation</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Token:</label>
                    <input 
                        type="text" 
                        value={token} 
                        onChange={(e) => setToken(e.target.value)} 
                        placeholder="Enter your token" 
                        required 
                    />
                </div>
                <div>
                    <label>Student ID:</label>
                    <input 
                        type="text" 
                        value={studentId} 
                        onChange={(e) => setStudentId(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Sport ID:</label>
                    <input 
                        type="text" 
                        value={sportId} 
                        onChange={(e) => setSportId(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Reservation Date:</label>
                    <input 
                        type="datetime-local" 
                        value={reservationDate} 
                        onChange={(e) => setReservationDate(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Day Booking (0 for Monday to 6 for Sunday):</label>
                    <input 
                        type="number" 
                        min="0" 
                        max="6" 
                        value={dayBooking} 
                        onChange={(e) => setDayBooking(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Hour Start:</label>
                    <input 
                        type="time" 
                        value={hourStart} 
                        onChange={(e) => setHourStart(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Hour End:</label>
                    <input 
                        type="time" 
                        value={hourEnd} 
                        onChange={(e) => setHourEnd(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Student ID List:</label>
                    {studentIdList.map((id, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                value={id}
                                onChange={(e) => handleStudentIdChange(index, e.target.value)}
                                placeholder={`Student ID ${index + 1}`}
                            />
                        </div>
                    ))}
                    <button type="button" onClick={addStudentIdField}>Add Another Student ID</button>
                </div>
                <button type="submit">Add Reservation</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default AddReservation;
