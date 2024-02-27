import React, { useState } from 'react';
import axios from 'axios';
import Heading from "../Heading ";
import '../styles/VendorFrom.css'
import Button from "../../Button/button";
const FormComponent = () => {
    const [formData, setFormData] = useState({
        name: '',
        contact: '',
        address: '',
        vendor_code: '',
    });
    const [submit, setSubmit] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setSubmit(true);
            await axios.post('http://127.0.0.1:8000/vendorapi/', formData);
            setFormData({
                name: '',
                contact: '',
                address: '',
                vendor_code: '',
            });
            setSubmit(false); // Reset submit state after successful submission
        } catch (error) {
            console.error('Error creating vendor:', error);
            // Handle errors (log to console or display an error message)
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div >
            <Heading title="CREATE A NEW VENDOR" />
            <form onSubmit={handleSubmit}>
             <div className="flex flex-col">
  <div className="mb-1">
    <label htmlFor="name" className="text-white">Name:</label>
    <input
      type="text"
      id="name"
      name="name"
      value={formData.name}
      onChange={handleChange}
      className="bg-transparent border border-white text-white px-2 py-1 rounded max-w-md w-full"
    />
  </div>
  <div className="mb-1">
    <label htmlFor="contact" className="text-white">Contact:</label>
    <input
      type="text"
      id="contact"
      name="contact"
      value={formData.contact}
      onChange={handleChange}
      className="bg-transparent border border-white text-white px-2 py-1 rounded max-w-md w-full"
    />
  </div>
  <div className="mb-1">
    <label htmlFor="address" className="text-white">Address:</label>
    <input
      type="text"
      id="address"
      name="address"
      value={formData.address}
      onChange={handleChange}
      className="bg-transparent border border-white text-white px-2 py-1 rounded max-w-md w-full"
    />
  </div>
  <div className="mb-1">
    <label htmlFor="vendor_code" className="text-white">Vendor Code:</label>
    <input
      type="text"
      id="vendor_code"
      name="vendor_code"
      value={formData.vendor_code}
      onChange={handleChange}
      className="bg-transparent border border-white text-white px-2 py-1 rounded max-w-md w-full"
    />
  </div>
</div>

                <Button/>

            </form>
        </div>
    );
};

export default FormComponent;
