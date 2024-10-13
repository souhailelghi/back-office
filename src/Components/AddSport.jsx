import React, { useState } from 'react';
import axios from 'axios';

const AddSport = () => {
  const [formData, setFormData] = useState({
    categorieId: '',
    referenceSport: '',
    nbPlayer: '',
    daysoff: '',
    conditions: '',
    name: '',
    description: '',
    image: '',
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(''); // Token input field

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await axios.post('https://localhost:7125/api/Sports/add', formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token
          'Content-Type': 'application/json',
        },
      });

      setSuccessMessage('Sport added successfully!');
      setFormData({ // Reset form after successful submission
        categorieId: '',
        referenceSport: '',
        nbPlayer: '',
        daysoff: '',
        conditions: '',
        name: '',
        description: '',
        image: '',
      });
    } catch (error) {
      setError(error.response ? error.response.data : 'Error adding sport');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Add Sport</h2>

      {/* Input for the token */}
      <div>
        <label>Token</label>
        <input
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Enter your token"
        />
      </div>

      {/* Form for adding a sport */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Category ID</label>
          <input
            type="text"
            name="categorieId"
            value={formData.categorieId}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Reference Sport</label>
          <input
            type="number"
            name="referenceSport"
            value={formData.referenceSport}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Number of Players</label>
          <input
            type="number"
            name="nbPlayer"
            value={formData.nbPlayer}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Days Off</label>
          <input
            type="number"
            name="daysoff"
            value={formData.daysoff}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Conditions</label>
          <input
            type="text"
            name="conditions"
            value={formData.conditions}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Sport'}
        </button>
      </form>

      {/* Display success or error message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default AddSport;
