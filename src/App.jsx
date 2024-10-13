import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddSportCategory from './Components/AddSportCategory';
import FetchSportCategories from './Components/FetchSportCategories';
import AddSport from './Components/AddSport';

function App() {
  const [sportData, setSportData] = useState({ token: '', categoryId: '' });

  return (
    <Router>
      <div>
        {/* Navigation Links */}
        <nav>
          <ul>
            <li><Link to="/">Add Sport Category</Link></li>
            <li><Link to="/fetch-categories">Fetch Sport Categories</Link></li>
          </ul>
        </nav>

        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<AddSportCategory />} />
          <Route path="/fetch-categories" element={<FetchSportCategories setSportData={setSportData} />} />
          <Route path="/add-sport" element={<AddSport token={sportData.token} categorieId={sportData.categoryId} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
