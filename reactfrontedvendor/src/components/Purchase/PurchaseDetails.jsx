import React, {useState} from "react";
import axios from "axios";
import Heading from "../Heading ";
import Button from "../../Button/button";

const PurchaseDetails = () => {


    const [poNumber, setPoNumber] = useState("");
    const [vendorDetails, setVendorDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const fetchPurchaseOrder = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `http://127.0.0.1:8000/purchaseorder/${poNumber}`
            );
            const responseData = Array.isArray(response.data)
                ? response.data
                : [response.data];
            setVendorDetails(responseData[0]);
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Error fetching data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (event) => {
        setPoNumber(event.target.value);
    };

    const showDetails = () => {
        fetchPurchaseOrder();
    };

    return (
        <div>
            <Heading title="RETRIEVE A SPECIFIC PURCHASE "/>
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

            {/*<button onClick={showDetails}>Show Details</button>*/}
            <Button onclick={showDetails}/>

            {vendorDetails && (
                <table className="data-table">
                    <thead>
                    <tr>
                        <th>PO Number</th>
                        <th>Vendor</th>
                        <th>Order Date</th>
                        <th>Delivery Date</th>
                        <th>Items</th>
                        <th>Quantity</th>
                        <th>Status</th>
                        <th>Quality Rating</th>
                        <th>Issue Date</th>
                        <th>Acknowledgment Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr key={vendorDetails.id}>
                        <td>{vendorDetails.po_number}</td>
                        <td>{vendorDetails.vendor}</td>
                        <td>{vendorDetails.order_date}</td>
                        <td>{vendorDetails.delivery_date}</td>
                        <td>{vendorDetails.items}</td>
                        <td>{vendorDetails.quantity}</td>
                        <td>{vendorDetails.status}</td>
                        <td>{vendorDetails.quality_rating}</td>
                        <td>{vendorDetails.issue_date}</td>
                        <td>{vendorDetails.acknowledgment_date}</td>
                    </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default PurchaseDetails;

