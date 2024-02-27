
import React from 'react';
import {Routes, Route} from 'react-router-dom';
import PurchaseOrder from "./PurchaseOrder";
import AllPurchase from "./AllPurchase";
import PurchaseDetails from "./PurchaseDetails";
import UpdatePurchase from "./UpdatePurchase";
import PurchaseDelete from "./PurchaseDelete";


function PurchaseRoutes() {
    return (
        <Routes>
            <Route path="order" element={<PurchaseOrder/>}/>
            <Route path="all" element={<AllPurchase/>}/>
            <Route path="retrieve" element={<PurchaseDetails/>}/>
            <Route path="update" element={<UpdatePurchase/>}/>
            <Route path="delete" element={<PurchaseDelete/>}/>


        </Routes>
    );
}

export default PurchaseRoutes;
