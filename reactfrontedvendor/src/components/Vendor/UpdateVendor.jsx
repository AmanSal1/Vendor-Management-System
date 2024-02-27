import React, {useState} from "react";
import axios from "axios";
import '../styles/AllVendor.css'
import Heading from "../Heading ";
import Button from "../../Button/button";

const UpdateVendor = () => {
    const [vendorCode, setVendorCode] = useState("");
    const [vendorDetails, setVendorDetails] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        contact: "",
        address: "",
        vendor_code: ""
    });
    const [showUpdateForm, setShowUpdateForm] = useState(false);

    const handleInputChange = (event) => {
        setVendorCode(event.target.value);
    };

    const handleShowUpdateForm = async () => {
        try {
            const response = await axios.get(
                `http://127.0.0.1:8000/vendorapi/${vendorCode}`);
            const responseData = Array.isArray(response.data)
                ? response.data
                : [response.data];
            setVendorDetails(responseData[0]);
            setFormData(responseData[0]); // Set form data to the fetched vendor details
            setShowUpdateForm(true);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.put(
                `http://127.0.0.1:8000/vendorapi/${vendorCode}`, formData);
            console.log("Vendor details updated successfully");
            setShowUpdateForm(false);
        } catch (error) {
            console.error("Error updating vendor details:", error);
        }
    };

    return (
        <div>
            <Heading title="UPDATE EXSITING VENDOR"/>
            <div className="flex flex-col">
                <label className="mb-1 text-white">
                    Enter Vendor code to Delete:
                </label>
                <input
                    type="number"
                    value={vendorCode}
                    onChange={handleInputChange}
                    className="bg-transparent border border-white text-white px-2 py-1 rounded max-w-md w-full"
                    maxLength={10}
                />
            </div>

            <Button onClick={handleShowUpdateForm}/>
            {showUpdateForm && (
                <form onSubmit={handleSubmit}>
                    {/* Your form fields */}
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Contact:
                        <input
                            type="number"
                            name="contact"
                            value={formData.contact}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Address:
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </label>
                    <Button/>
                </form>
            )}
        </div>
    );
};

export default UpdateVendor;
