// VendorRoutes.js

import React from 'react';
import {Routes, Route} from 'react-router-dom';
import AllVendor from "./AllVendor";
import VendorForm from "./VendorForm";
import SpecificVendor from "./SpecificVendor";
import UpdateVendor from "./UpdateVendor";
import DeleteVendor from "./DeleteVendor";
import Performhance from "./Performhance";


function VendorRoutes() {
    return (
        <Routes>
            <Route path="all" element={<AllVendor/>}/>
            <Route path="form" element={<VendorForm/>}/>
            <Route path="specific" element={<SpecificVendor/>}/>
            <Route path="update" element={<UpdateVendor/>}/>
            <Route path="delete" element={<DeleteVendor/>}/>
            <Route path="Performance" element={<Performhance/>}/>

        </Routes>
    );
}

export default VendorRoutes;
