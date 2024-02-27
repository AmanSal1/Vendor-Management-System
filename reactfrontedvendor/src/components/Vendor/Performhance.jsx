import React, {useState} from "react";
import axios from "axios";
import Heading from "../Heading ";
import Button from "../../Button/button";

const SpecificVendor = () => {
    const [vendorCode, setVendorCode] = useState("");
    const [vendorDetails, setVendorDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchVendorDetails = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `http://127.0.0.1:8000/vendorapi/${vendorCode}`
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
        setVendorCode(event.target.value);
    };

    const showDetails = () => {
        fetchVendorDetails();
    };

    return (
        <div className="mb-1">
            <Heading title="RETREIVE PERFORMANCE OF SPECIFIC VENDOR "/>
             <div className="flex flex-col">
                <label className="mb-1 text-white">
                    Enter Vendor code to fetch details:
                </label>
                <input
                    type="number"
                    value={vendorCode}
                    onChange={handleInputChange}
                    className="bg-transparent border border-white text-white px-2 py-1 rounded max-w-md w-full"
                />
            </div>
            <Button onClick={showDetails}/>

            {loading && <p>Loading...</p>}
            {error && <p className="error-message">{error}</p>}

            {vendorDetails && (
                <table className="data-table">
                    <thead>
                    <tr>
                        <th>Vendor Code</th>
                        <th>On Time Delivery Rate</th>
                        <th>Quality Rating Avg</th>
                        <th>Average Response Time</th>
                        <th>Fulfillment_rate</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr key={vendorDetails.id}>
                        <td>{vendorDetails.vendor_code}</td>
                        <td>{vendorDetails.on_time_delivery_rate}</td>
                        <td>{vendorDetails.quality_rating_avg}</td>
                        <td>{vendorDetails.average_response_time}</td>
                        <td>{vendorDetails.fulfillment_rate}</td>
                    </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default SpecificVendor;
