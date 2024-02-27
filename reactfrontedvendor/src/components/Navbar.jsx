import React from 'react';
import './styles/Navbar.css';

function Navbar({ isLoggedIn, handleLogout }) {
    const handleLogoutClick = () => {
        handleLogout(); // Call handleLogout function passed from App.jsx
    };

    return (
        <nav className=" navbar glow relative rounded-full border border-transparent dark:bg-black dark:border-white/[0.2] bg-white shadow-input flex justify-center space-x-4 px-8 py-6">
            <ul className="flex justify-center items-center space-x-10">
                <li className="relative">
                    <a href="/" className="nav-link">Home</a>
                </li>
                {isLoggedIn ? (
                    <>
                        <li className="relative">
                            <a href="/vendor" className="nav-link">Vendor</a>
                            <ul className="dropdown-menu">
                                <li><a href="/vendor/all">All Vendors</a></li>
                                <li><a href="/vendor/form">Add Vendor</a></li>
                                <li><a href="/vendor/specific">Specific Vendor</a></li>
                                <li><a href="/vendor/update">Specific Update</a></li>
                                <li><a href="/vendor/delete">Specific Delete</a></li>
                                <li><a href="/vendor/performance">Performance</a></li>
                            </ul>
                        </li>
                        <li className="relative">
                            <a href="/purchase" className="nav-link">Purchase</a>
                            <ul className="dropdown-menu">
                                <li><a href="/purchase/all">All Purchases</a></li>
                                <li><a href="/purchase/order">Purchase Order</a></li>
                                <li><a href="/purchase/retrieve">Purchase Retrieve</a></li>
                                <li><a href="/purchase/update">Purchase Update</a></li>
                                <li><a href="/purchase/delete">Purchase Delete</a></li>
                            </ul>
                        </li>
                        <li className="relative">
                            <a href="#" onClick={handleLogoutClick} className="nav-link">Logout</a>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="relative">
                            <a href="/registration" className="nav-link">Registration</a>
                        </li>
                        <li className="relative">
                            <a href="/login" className="nav-link">Login</a>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
