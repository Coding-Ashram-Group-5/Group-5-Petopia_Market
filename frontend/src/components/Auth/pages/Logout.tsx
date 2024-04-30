import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../lib/api';

interface LogoutProps {
  buttonLabel: string;
}

const Logout: React.FC<LogoutProps> = ({ buttonLabel }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const confirmed = window.confirm('Are you sure you want to logout?');
    if (confirmed) {
      try {
        await logout();
        localStorage.clear(); // Clear local storage
        document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; // Clear refreshToken cookie
        navigate('/login'); // Redirect to login page
        // Auto-refresh after logout
        setTimeout(() => {
          window.location.reload();
        }, 100); // Refresh after 0.1 second
      } catch (error) {
        console.error(error); // Handle error
      }
    }
  };

  return (
    <button type="button" onClick={handleLogout}>{buttonLabel}</button>
  );
};

export default Logout;
