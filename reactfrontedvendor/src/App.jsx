import React, {useState, useEffect} from 'react';
import {Routes, Route, BrowserRouter as Router, Navigate} from 'react-router-dom';
import Navbar from "./components/Navbar";
import VendorRoutes from "./components/Vendor/VendorRoutes";
import PurchaseRoutes from "./components/Purchase/PurchaseRoute";
import NewVendorForm from "./components/LoginHandle/Vendorregistration";
import LoginComponent from "./components/LoginHandle/Login";
import Logout from "./components/LoginHandle/Logout ";
import './App.css'
import {LampDemo} from "./components/ui/Spotlight";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogin = () => {
        setIsLoggedIn(true);
        window.history.pushState(null, '', '/'); // Redirect to home page after login
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('token');
        window.location.href = '/'; // Redirect to home page after logout
    };

    return (
        <div className="app-container bg-black">
            <Router>
                <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>
                <div className="main-content">
                    <Routes>
                        <Route path="/" element={
                            <>
                                <div className="overlay">
                                    {/* Overlay for LampDemo component */}
                                    <LampDemo/>
                                </div>
                                <LampDemo/>
                            </>
                        }/>
                        <Route path="/vendor/*" element={<VendorRoutes/>}/>
                        <Route path="/purchase/*" element={<PurchaseRoutes/>}/>
                        <Route path="/logout" element={<Logout/>}/>
                        {isLoggedIn ? null : (
                            <>
                                <Route path="/registration" element={<NewVendorForm/>}/>
                                <Route path="/login" element={<LoginComponent handleLogin={handleLogin}/>}/>
                            </>
                        )}
                        <Route path="*" element={<Navigate to="/"/>}/> {/* Redirect to home page for unknown routes */}
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;
