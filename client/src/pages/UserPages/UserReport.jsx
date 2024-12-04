import React, { useState } from 'react';
import { Navbar } from '../../components/navbar/Navbar';
import { Sidebar } from '../../components/sidebar/Sidebar';
import { Crumb } from '../../components/Crumb/Crumb';
import { ReportModal } from '../../components/Modals/Report Modal/ReportModal';

export const UserReport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [reportData, setReportData] = useState([]); // New state for storing report data

  const toggleMenu = () => {
    setIsOpen(prevState => !prevState);
  };
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // Function to update report data from ReportModal
  const handleReportData = (data) => {
    setReportData(data); // Set the fetched data in state
  };

  return (
    <>
      <div className="container">
        <Sidebar isOpen={isOpen} />
        <Navbar onClick={toggleMenu} />
        <div className="content">
          <div className="main">
            <Crumb link1="/dashboard" name1="Dashboard" link2="/report" name2="Reports" />
            <div className="body">
              <div className="head">
                <h3>Reports</h3>
                <button onClick={handleShowModal}>Generate Report</button>
              </div>
              <div className="table">
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Sub Total</th>
                      <th>Mode of Payment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.length > 0 ? (
                      reportData[0].itemSales.map((sale, index) => (
                        <>
                        <div key={index}>
                        <tr>{/* <td>{sale.modeOfPayment}</td> */}</tr>
                        <tr><td>{sale.date}</td></tr>
                        <tr>
                          <td>{sale.product}</td>
                          <td>{sale.quantity}</td>
                          <td>{sale.price}</td>
                          <td>{sale.subTotal}</td>
                        </tr>
                        </div>
                        </>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6">No data available</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <ReportModal onClose={handleCloseModal} onGenerateReport={handleReportData} /> // Pass callback as a prop
      )}
    </>
  );
};
