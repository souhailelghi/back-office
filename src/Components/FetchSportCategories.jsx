import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Components/FetchSportCategories.css'; // Import CSS file for styling

const FetchSportCategories = () => {
  const [sportCategories, setSportCategories] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(''); // token input field

  useEffect(() => {
    // Fetch the sport categories when the token is provided
    if (token) {
      fetchSportCategories();
    }
  }, [token]);

  const fetchSportCategories = async () => {
    try {
      const response = await axios.get('https://localhost:7125/api/SportCategorys/list', {
        headers: {
          Authorization: `Bearer ${token}`, // Token is required
        },
      });

      setSportCategories(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.response ? error.response.data : 'Error fetching data');
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Sport Categories</h2>

      {/* Input for the token */}
      <div className="input-container">
        <label>Token</label>
        <input
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Enter your token"
        />
      </div>

      {/* Display loading message */}
      {loading && <p>Loading sport categories...</p>}

      {/* Display error message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* List of sport categories */}
      <div className="card-container">
        {sportCategories.map((category) => (
          <div className="card" key={category.id}>
            <h3>{category.name}</h3>
            <p><strong>Description:</strong> {category.description || 'No description'}</p>
            <p><strong>Date Created:</strong> {category.dateCreation || 'N/A'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FetchSportCategories;
