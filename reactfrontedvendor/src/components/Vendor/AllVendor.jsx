import React, {useEffect, useState} from 'react';
import '../styles/AllVendor.css';
import axios from "axios";
import Heading from "../Heading ";

const AllVendor = ({vendorCode}) => {

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(' http://127.0.0.1:8000/vendorapi/');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }

        }
        fetchdata()

    }, [])
    return (
        <div >
            <Heading title="ALL VENDORS"/>

            <table className="data-table ">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Contact</th>
                    <th>Address</th>
                    <th>Vendor Code</th>
                </tr>
                </thead>
                <tbody>
                {data.map((row) => (
                    <tr key={row.id}>
                        <td>{row.id}</td>
                        <td>{row.name}</td>
                        <td>{row.contact}</td>
                        <td>{row.address}</td>
                        <td>{row.vendor_code}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllVendor;