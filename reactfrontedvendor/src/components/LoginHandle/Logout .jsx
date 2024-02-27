import React from 'react';

const Logout = ({ handleLogout }) => {
    const handleLogoutClick = () => {
        localStorage.removeItem('token'); // Remove the token from localStorage
        handleLogout(); // Call handleLogout function passed as a prop
        // Redirect or perform other actions upon successful logout
    };

    return (
        <div>
        </div>
    );
};

export default Logout;
