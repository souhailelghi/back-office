// NavBar.js
import React from 'react';

const NavBar = ({ onToggleCategories }) => {
  return (
    <nav>
      <button onClick={onToggleCategories}>Toggle Sport Categories</button>
    </nav>
  );
};

export default NavBar;
