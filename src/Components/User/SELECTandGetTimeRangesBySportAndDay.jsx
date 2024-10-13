import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SELECTandGetTimeRangesBySportAndDay = () => {
    const [sportId, setSportId] = useState('');
    const [day, setDay] = useState(''); // Will be set to today's day
    const [token, setToken] = useState(''); // For storing the token
    const [timeRanges, setTimeRanges] = useState([]);
    const [selectedTimeRange, setSelectedTimeRange] = useState(null); // Track selected time range
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Set day to today's day
    useEffect(() => {
        const today = new Date();
        const dayOfWeek = today.toLocaleDateString('en-US', { weekday: 'long' }); // Get the full name of today's day
        setDay(dayOfWeek); // Set today's day to the state
    }, []);

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

    const handleTokenChange = (e) => {
        setToken(e.target.value);
    };

    const handleTimeRangeChange = (e) => {
        setSelectedTimeRange(e.target.value); // Update selected time range
    };

    return (
        <div>
            <h1>Get Available Time Ranges for {day}</h1>
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
                    <form>
                        {timeRanges.map((timeRange) => (
                            <div key={timeRange.id}>
                                <input
                                    type="radio"
                                    id={`timeRange-${timeRange.id}`}
                                    name="timeRange"
                                    value={timeRange.id}
                                    onChange={handleTimeRangeChange}
                                />
                                <label htmlFor={`timeRange-${timeRange.id}`}>
                                    {timeRange.hourStart} - {timeRange.hourEnd}
                                </label>
                            </div>
                        ))}
                    </form>
                    {selectedTimeRange && (
                        <p>Selected Time Range ID: {selectedTimeRange}</p>
                    )}
                </div>
            )}

            {timeRanges.length === 0 && !loading && !error && <p>No time ranges available</p>}
        </div>
    );
};

export default SELECTandGetTimeRangesBySportAndDay;
