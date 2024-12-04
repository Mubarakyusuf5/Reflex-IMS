import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AdminSidebar } from "../../components/sidebar/Sidebar";
import { Navbar } from "../../components/navbar/Navbar";
import axios from 'axios';
import { useReactToPrint } from "react-to-print";
import { ReportPrint } from "../../components/Printable/ReportPrint";
import ReactPaginate from 'react-paginate';

export const Report = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [saleData, setSaleData] = useState([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 10; // Number of items per page
  const contentRef = useRef();

  const toggleMenu = () => {
    setIsOpen(prevState => !prevState);
  };

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const response = await axios.get("/api/user/displaySale");
      setSaleData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error("Error fetching sales data:", error);
    }
  };

  useEffect(() => {
    handleFilter();
  }, [toDate, fromDate]);

  const handleFilter = () => {
    const filtered = saleData.filter(sale => {
      const saleDate = new Date(sale.date);
      const startDate = new Date(fromDate);
      const endDate = new Date(toDate);
      endDate.setHours(23, 59, 59, 999);
      return saleDate >= startDate && saleDate <= endDate;
    });
    setFilteredData(filtered);
    setCurrentPage(0); // Reset to first page after filtering
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const handleReportPrint = useReactToPrint({
    contentRef
  });

  const grandTotal = filteredData.reduce((acc, row) => acc + row.overallTotal, 0);
  const totalProfit = filteredData.reduce((acc, row) => {
    const itemProfit = row.itemSales.reduce((itemAcc, item) => itemAcc + item.profit, 0);
    return acc + itemProfit;
  }, 0).toFixed(2);

  const formatNaira = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount);
  };

  // Data for the current page
  const currentData = filteredData.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  return (
    <>
      <div className="container">
        <AdminSidebar isOpen={isOpen} />
        <Navbar onClick={toggleMenu} />
        <div className="content">
          <div className="main">
            <div className="crumb">
              <NavLink to="/admin/dashboard">Dashboard</NavLink> / <NavLink to="/admin/report">Reports</NavLink>
            </div>

            <div className="body">
              <div className="head">
                <h3>Reports</h3>
                <button onClick={handleReportPrint}>Generate Report</button>
              </div>
              <div className="table">
                <div className="dateCon">
                  <div className="dateGroup">
                    <label htmlFor="from">From:</label>
                    <input
                      type="date"
                      id="from"
                      value={fromDate}
                      onChange={(e) => {
                        setFromDate(e.target.value);
                        setDisabled(false);
                      }}
                    />
                  </div>
                  <div className="dateGroup">
                    <label htmlFor="to">To:</label>
                    <input
                      type="date"
                      id="to"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                      disabled={disabled}
                    />
                  </div>
                </div>
                <div style={{ display: "none" }}>
                  <ReportPrint
                    ref={contentRef}
                    filteredData={filteredData}
                    toDate={toDate}
                    fromDate={fromDate}
                    totalProfit={totalProfit}
                  />
                </div>
                <table className="report">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Products</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Sub Total</th>
                      <th>Profit</th>
                      <th>Total</th>
                      <th>Mode of Payment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.length > 0 ? (
                      <>
                        {currentData.map((row, index) => (
                          <React.Fragment key={index}>
                            {row.itemSales.map((product, prodIndex) => (
                              <tr key={prodIndex}>
                                {prodIndex === 0 && (
                                  <td rowSpan={row.itemSales.length}>
                                    {new Date(row.date).toLocaleDateString()}
                                  </td>
                                )}
                                <td>{product.productName}</td>
                                <td>{formatNaira(product.price)}</td>
                                <td>{product.quantity}</td>
                                <td>{formatNaira(product.price * product.quantity)}</td>
                                <td>{formatNaira(product.profit)}</td>
                                {prodIndex === 0 && (
                                  <td rowSpan={row.itemSales.length}>
                                    {formatNaira(row.overallTotal)}
                                  </td>
                                )}
                                {prodIndex === 0 && (
                                  <td rowSpan={row.itemSales.length}>
                                    {row.modeOfPayment}
                                  </td>
                                )}
                              </tr>
                            ))}
                          </React.Fragment>
                        ))}
                        <tr>
                          <td colSpan="6"></td>
                          <td>Grand Total</td>
                          <td>{formatNaira(grandTotal)}</td>
                        </tr>
                        <tr>
                          <td colSpan="6"></td>
                          <td>Total Profit</td>
                          <td>{formatNaira(totalProfit)}</td>
                        </tr>
                      </>
                    ) : (
                      <tr>
                        <td colSpan="7" style={{ textAlign: 'center' }}>
                          No sales found for the selected date range.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                {/* Pagination Controls */}
                <ReactPaginate
                  pageCount={Math.ceil(filteredData.length / itemsPerPage)}
                  onPageChange={handlePageClick}
                  containerClassName="pagination"
                  activeClassName="active"
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
                  breakLabel={"..."}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={3}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
