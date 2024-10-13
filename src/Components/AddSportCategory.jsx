import React, { useState } from 'react';
import axios from 'axios';

const AddSportCategory = () => {
  const [name, setName] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!name) {
      setError('Name is required');
      return;
    }

    const sportCategoryData = {
      Name: name
    };

    try {
      const response = await axios.post('https://localhost:7125/api/SportCategorys/add', sportCategoryData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        setSuccessMessage('Sport Category added successfully!');
        setName('');
        setToken('');
      }
    } catch (error) {
      if (error.response) {
        const serverErrorMessage = error.response.data?.message || JSON.stringify(error.response.data);
        setError(`An error occurred: ${serverErrorMessage}`);
      } else {
        setError(`An error occurred: ${error.message}`);
      }
    }
  };

  return (
    <div>
      <h2>Add Sport Category</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Token</label>
          <input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Enter your token"
          />
        </div>

        <button type="submit">Add Sport Category</button>
      </form>
    </div>
  );
};

export default AddSportCategory;
