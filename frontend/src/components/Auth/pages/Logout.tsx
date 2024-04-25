import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../lib/api';

const Logout: React.FC = () => {
  const Navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.clear(); // Clear local storage
      document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; // Clear refreshToken cookie
      Navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error(error); // Handle error
    }
  };

  return (
    <div>
      <h2>Logout</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
