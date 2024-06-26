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
        navigate('/'); // Redirect to register page
        // Auto-refresh after logout
        window.location.reload();
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
