import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddSport = ({ token, categorieId }) => {
  const [formData, setFormData] = useState({
    categorieId: categorieId || '', // Use the passed category ID
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

  useEffect(() => {
    // Update form data if category ID changes
    if (categorieId) {
      setFormData((prevData) => ({ ...prevData, categorieId }));
    }
  }, [categorieId]);

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

    // Function to truncate the token to 20 characters
    const truncateToken = (token) => {
        return token.length > 20 ? token.slice(0, 20) + '...' : token;
      };

  return (
    <div>
      <h2>Add Sport</h2>

      {/* Input for the token */}
      <div>
        <label>Token : </label>   <p title={token}>{truncateToken(token)}</p> 
     
      </div>

      {/* Form for adding a sport */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Category ID : </label>
          {formData.categorieId}
      
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
