import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '@/lib/api';
import usePersonStore from '@/lib/Utils/zustandStore'; // Adjust the path according to your project structure

interface LogoutProps {
    buttonLabel: string;
}

const Logout: React.FC<LogoutProps> = ({ buttonLabel }) => {
    const navigate = useNavigate();
    const updatePerson = usePersonStore(state => state.updatePerson);
    const setLoggedIn = usePersonStore(state => state.setLoggedIn);

    const handleLogout = async () => {
        const confirmed = window.confirm('Are you sure you want to logout?');
        if (confirmed) {
            try {
                await logout();
                updatePerson('', '', '', '', { publicId: '', url: '' });
                setLoggedIn(false); // Update loggedIn state
                navigate('/');
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
