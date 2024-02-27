
import React, {useState} from "react";
import axios from "axios";
import PurchaseOrder from "./PurchaseOrder";
import Heading from "../Heading ";
import Button from "../../Button/button";

const UpdatePurchase = () => {
    const [poNumber, setPoNumber] = useState("");
    const [vendorDetails, setVendorDetails] = useState(null);
    const [showUpdateForm, setShowUpdateForm] = useState(false);

    const handleInputChange = (event) => {
        setPoNumber(event.target.value);
    };

    const handleShowUpdateForm = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/purchaseorder/${poNumber}`);
            const responseData = Array.isArray(response.data) ? response.data : [response.data];
            setVendorDetails(responseData[0]);
            setShowUpdateForm(true);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handlePurchaseSubmit = (data) => {
        // Handle the submission response as needed
        console.log("Purchase details updated successfully", data);
        setShowUpdateForm(false);
    };

    return (
        <div>
            <Heading title="UPDATE PURCHASE ORDEER"/>
            <div className="flex flex-col">
                <label className="mb-1 text-white">
                    Enter Purchase Number to Delete:
                </label>
                <input
                    type="number"
                    value={poNumber}
                    onChange={handleInputChange}
                    className="bg-transparent border border-white text-white px-2 py-1 rounded max-w-md w-full"
                    maxLength={10}
                />
            </div>


            <Button onClick={handleShowUpdateForm}/>

            {showUpdateForm && (
                <PurchaseOrder onSubmit={handlePurchaseSubmit} initialFormData={vendorDetails}/>
            )}
        </div>
    );
};

export default UpdatePurchase;
