import React, {useState} from "react";
import axios from "axios";
import Heading from "../Heading ";
import Button from "../../Button/button";

const PurchaseOrder = ({onSubmit, initialFormData, endpoint, buttonText}) => {
    const [formData, setFormData] = useState(initialFormData || {
        po_number: 0,
        vendor: 0,
        order_date: "",
        delivery_date: "",
        items: "",
        quantity: 0,
        status: "",
        quality_rating: 0.0,
        issue_date: "",
        acknowledgment_date: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://127.0.0.1:8000/purchaseorder/`, formData);
            console.log('Response:', response.data);
            setFormData({
                po_number: '',
                vendor: '',
                order_date: '',
                expected_delivery_date: '',
                delivered_date: '',
                items: '',
                quantity: 0,
                status: '',
                quality_rating: 0.0,
                issue_date: '',
                acknowledgment_date: ''
            });
            if (onSubmit) {
                onSubmit(response.data);
            }
        } catch (error) {
            console.error('Error:', error.response.status, error.response.data);
        }
    };

    return (
        <div>
             <Heading title="CREATE A NEW ORDER"/>


        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
  <div className="mb-1">
    <label htmlFor="po_number" className="text-white">PO Number:</label>
    <input
      type="number"
      id="po_number"
      name="po_number"
      value={formData.po_number}
      onChange={handleChange}
      className="bg-transparent border border-white text-white px-2 py-1 rounded max-w-md w-full"
    />
  </div>
  <div className="mb-1">
    <label htmlFor="vendor" className="text-white">Vendor:</label>
    <input
      type="number"
      id="vendor"
      name="vendor"
      value={formData.vendor}
      onChange={handleChange}
      className="bg-transparent border border-white text-white px-2 py-1 rounded max-w-md w-full"
    />
  </div>
  <div className="mb-1">
    <label htmlFor="order_date" className="text-white">Order Date:</label>
    <input
      type="datetime-local"
      id="order_date"
      name="order_date"
      value={formData.order_date}
      onChange={handleChange}
      className="bg-transparent border border-white text-white px-2 py-1 rounded max-w-md w-full"
    />
  </div>
  <div className="mb-1">
    <label htmlFor="delivery_date" className="text-white">Expected Delivery Date:</label>
    <input
      type="datetime-local"
      id="delivery_date"
      name="delivery_date"
      value={formData.expected_delivery_date}
      onChange={handleChange}
      className="bg-transparent border border-white text-white px-2 py-1 rounded max-w-md w-full"
    />
  </div>
  <div className="mb-1">
    <label htmlFor="delivered_date" className="text-white">Delivered Date:</label>
    <input
      type="datetime-local"
      id="delivered_date"
      name="delivered_date"
      value={formData.delivered_date}
      onChange={handleChange}
      className="bg-transparent border border-white text-white px-2 py-1 rounded max-w-md w-full"
    />
  </div>
  <div className="mb-1">
    <label htmlFor="items" className="text-white">Items:</label>
    <input
      type="text"
      id="items"
      name="items"
      value={formData.items}
      onChange={handleChange}
      className="bg-transparent border border-white text-white px-2 py-1 rounded max-w-md w-full"
    />
  </div>
  <div className="mb-1">
    <label htmlFor="quantity" className="text-white">Quantity:</label>
    <input
      type="number"
      id="quantity"
      name="quantity"
      value={formData.quantity}
      onChange={handleChange}
      className="bg-transparent border border-white text-white px-2 py-1 rounded max-w-md w-full"
    />
  </div>
  <div className="mb-1">
    <label htmlFor="status" className="text-white">Status:</label>
    <input
      type="text"
      id="status"
      name="status"
      value={formData.status}
      onChange={handleChange}
      className="bg-transparent border border-white text-white px-2 py-1 rounded max-w-md w-full"
    />
  </div>
  <div className="mb-1">
    <label htmlFor="quality_rating" className="text-white">Quality Rating:</label>
    <input
      type="number"
      id="quality_rating"
      step="0.1"
      name="quality_rating"
      value={formData.quality_rating}
      onChange={handleChange}
      className="bg-transparent border border-white text-white px-2 py-1 rounded max-w-md w-full"
    />
  </div>
  <div className="mb-1">
    <label htmlFor="issue_date" className="text-white">Issue Date:</label>
    <input
      type="datetime-local"
      id="issue_date"
      name="issue_date"
      value={formData.issue_date}
      onChange={handleChange}
      className="bg-transparent border border-white text-white px-2 py-1 rounded max-w-md w-full"
    />
  </div>
  <div className="mb-1">
    <label htmlFor="acknowledgment_date" className="text-white">Acknowledgment Date:</label>
    <input
      type="datetime-local"
      id="acknowledgment_date"
      name="acknowledgment_date"
      value={formData.acknowledgment_date}
      onChange={handleChange}
      className="bg-transparent border border-white text-white px-2 py-1 rounded max-w-md w-full"
    />
  </div>
</div>


           <Button/>
        </form>
            </div>
    )
};

export default PurchaseOrder