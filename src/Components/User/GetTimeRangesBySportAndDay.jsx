import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetTimeRangesBySportAndDay = () => {
    const [sportId, setSportId] = useState('');
    const [day, setDay] = useState('Monday'); // Default to Monday
    const [token, setToken] = useState(''); // For storing the token
    const [timeRanges, setTimeRanges] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const dayOptions = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']; // Add more days if necessary

    const fetchTimeRanges = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(
                `https://localhost:7125/api/Plannings/get-timeRanges-by-sport-and-day-not-reserved/${sportId}/${day}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Add token to request header
                    },
                }
            );
            setTimeRanges(response.data);
        } catch (err) {
            setError('Error fetching time ranges');
        } finally {
            setLoading(false);
        }
    };

    const handleSportIdChange = (e) => {
        setSportId(e.target.value);
    };

    const handleDayChange = (e) => {
        setDay(e.target.value);
    };

    const handleTokenChange = (e) => {
        setToken(e.target.value);
    };

    return (
        <div>
            <h1>Get Available Time Ranges</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    fetchTimeRanges();
                }}
            >
                <div>
                    <label htmlFor="sportId">Sport ID:</label>
                    <input
                        type="text"
                        id="sportId"
                        value={sportId}
                        onChange={handleSportIdChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="day">Day:</label>
                    <select id="day" value={day} onChange={handleDayChange}>
                        {dayOptions.map((dayOption) => (
                            <option key={dayOption} value={dayOption}>
                                {dayOption}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="token">Authorization Token:</label>
                    <input
                        type="text"
                        id="token"
                        value={token}
                        onChange={handleTokenChange}
                        required
                    />
                </div>
                <button type="submit">Get Time Ranges</button>
            </form>

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            {timeRanges.length > 0 && (
                <div>
                    <h2>Available Time Ranges</h2>
                    <ul>
                        {timeRanges.map((timeRange) => (
                            <li key={timeRange.id}>
                                {timeRange.hourStart} - {timeRange.hourEnd}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {timeRanges.length === 0 && !loading && !error && <p>No time ranges available</p>}
        </div>
    );
};

export default GetTimeRangesBySportAndDay;
