import React, {useEffect, useState} from "react";
import axios from "axios";
import Heading from "../Heading ";
import Button from "../../Button/button";

const AllPurchase = () => {
    const [data, setData] = useState([]);
    const [selectedVendor, setSelectedVendor] = useState(null);

    const fetchdata = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/purchaseorder/');
            setData(response.data);
        } catch (error) {
            // Handle errors if any
        }
    };

    useEffect(() => {
        fetchdata();
    }, []);

    const handleFilter = () => {
        if (selectedVendor !== null && selectedVendor !== "") {
            const filteredData = data.filter(row => row.vendor.toString() === selectedVendor.toString());
            setData(filteredData);
        } else {
            fetchdata();
        }
    };

    const resetFilter = () => {
        fetchdata();
        setSelectedVendor(null);
    };

    return (
        <div>
            <Heading title="ALL PURCHASES"/>
            <label>Filter by Vendor code:</label>
            <input
                type="number"
                id="vendorFilter"
                value={selectedVendor || ''}
                onChange={(e) => setSelectedVendor(e.target.value)}
                className="bg-transparent border border-white text-white px-2 py-1 rounded max-w-md w-full"

            />

            <div style={{display: "flex", gap: "10px"}}>
                <Button onClick={handleFilter} style={{width: "80px", height: "30px", fontSize: "14px"}}>Filter</Button>
                <Button onClick={resetFilter} style={{width: "80px", height: "30px", fontSize: "14px"}}>Reset</Button>
            </div>

            <table className="data-table ">
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
                {data.map((row) => (
                    <tr key={row.id}>
                        <td>{row.po_number}</td>
                        <td>{row.vendor}</td>
                        <td>{row.order_date}</td>
                        <td>{row.delivery_date}</td>
                        <td>{row.items}</td>
                        <td>{row.quantity}</td>
                        <td>{row.status}</td>
                        <td>{row.quality_rating}</td>
                        <td>{row.issue_date}</td>
                        <td>{row.acknowledgment_date}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllPurchase;
