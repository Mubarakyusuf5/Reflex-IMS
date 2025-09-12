import React, { forwardRef } from "react";
// import {Barcode} from 'react-barcode';  // Import Barcode component
import './print.css';

export const Receipt = forwardRef((props, ref) => {
  const { sales, overallTotal, products, modeOfPayment } = props;

  // Generate a unique reference ID
  const referenceId = `REF-${Math.floor(1000 + Math.random() * 9000).toString()}`;

  const formatNaira = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount);
  };

  const currentDate = new Date().toLocaleDateString("en-US", {
    dateStyle: "long",
  });
  
  const currentTime = new Date().toLocaleTimeString("en-US", {
    timeStyle: "short"
  });

  return (
    <div ref={ref} className="receipt">
      <p className="rDate">{currentDate}{" "}{currentTime}</p>
      <div className="top">
        <h3>Reflex Enterprise</h3>
        <p className="addr">Ktrada Qtrs ISQ Block 6, Katsina state</p>
        <p style={{fontSize: "0.8rem"}}><b>Reference ID:</b> {referenceId}</p> {/* Display the Reference ID */}
        <p>Customer Receipt</p>
      </div>
      <table>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Sub Total</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale, index) => (
            <tr key={index}>
              <td>{products.find((p) => p._id === sale.product)?.productName || "Unknown Product"}</td>
              <td>{sale.quantity}</td>
              <td>{formatNaira(sale.price)}</td>
              <td>{formatNaira(sale.subTotal)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="overTotal">
        <b>Overall Total: </b>
        {formatNaira(overallTotal)}
      </p>
      <p>
        <b>Payment Method:</b> {modeOfPayment}
      </p>
      {/* <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0', height: '50px', width: '90%' }}>
          <Barcode 
            value={referenceId} 
          />
        </div> */}
      <p className="pLast">Thanks for shopping with us</p>
    </div>
  );
});
