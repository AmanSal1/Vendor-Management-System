import React, { useState } from "react";
import axios from "axios";
import '../styles/AllVendor.css'
import Heading from "../Heading ";
import Button from "../../Button/button";
const PurchaseDelete = () => {
  const [poNumber, setPoNumber] = useState();
  const [deleteStatus, setDeleteStatus] = useState(null);

  const handleInputChange = (event) => {
    setPoNumber(event.target.value);
  };

  const handleDeleteVendor = async () => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/purchaseorder/${poNumber}`);

      if (response.status === 200) {
        setDeleteStatus(`Order with poNumber  ${poNumber} deleted successfully`);
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
      <Heading title="DELETE PURCHSE ORDER"/>
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


        <Button/>
      {deleteStatus && <p>{deleteStatus}</p>}
    </div>
  );
};

export default PurchaseDelete;

