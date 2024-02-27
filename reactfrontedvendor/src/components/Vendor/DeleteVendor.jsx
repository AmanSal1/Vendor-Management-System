import React, {useState} from "react";
import axios from "axios";
import '../styles/AllVendor.css'
import Heading from "../Heading ";
import Button from "../../Button/button";

const DeleteVendor = () => {
    const [vendorCode, setVendorCode] = useState("");
    const [deleteStatus, setDeleteStatus] = useState(null);

    const handleInputChange = (event) => {
        setVendorCode(event.target.value);
    };

    const handleDeleteVendor = async () => {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/vendorapi/${vendorCode}`);

            if (response.status === 200) {
                setDeleteStatus(`Vendor with code ${vendorCode} deleted successfully`);
            } else {
                setDeleteStatus("Error deleting vendor");
            }
        } catch (error) {
            console.error("Error deleting vendor:", error);
            setDeleteStatus("Error deleting vendor");
        }
    };

    return (
        <div>
            <Heading title="DELETE A VENDOR"/>
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

            <Button onClick={handleDeleteVendor}/>
            {deleteStatus && <p>{deleteStatus}</p>}
        </div>
    );
};

export default DeleteVendor;
