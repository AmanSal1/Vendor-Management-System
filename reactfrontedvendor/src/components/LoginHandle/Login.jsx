import React, {useState} from 'react';
import axios from 'axios';
import Button from "../../Button/button";

const LoginComponent = ({handleLogin}) => {
    const [formData, setFormData] = useState({
        vendor_code: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/login/', JSON.stringify(formData), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const accessToken = response.data.access_token;
            localStorage.setItem('token', accessToken);
            handleLogin(); // Call handleLogin function passed as a prop
            // Redirect or perform other actions upon successful login
        } catch (error) {
            setError('Invalid credentials. Please try again.');
        }
    };

    return (
        <div>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Vendor Code:
                    <input type="text" name="vendor_code" value={formData.vendor_code} onChange={handleChange}
                           className="bg-transparent border border-white text-white px-2 py-1 rounded max-w-md w-full"
                    />
                </label>
                <Button/>
            </form>

        </div>
    );
};

export default LoginComponent;
