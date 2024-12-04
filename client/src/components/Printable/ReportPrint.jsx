import React, { forwardRef } from "react";
import './print.css'

export const ReportPrint = forwardRef((props, ref) => {
  const { filteredData, toDate, fromDate, totalProfit } = props

  const grandTotal = filteredData.reduce((acc, row) => acc + row.overallTotal, 0);
  const formatNaira = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount);
  };
  return (
    <div className="reportPrint" ref={ref}>
      <div className="RHead">
      <h1>Reflex Enterprise</h1>
      <h2>Inventory Management System</h2>
      <p>Sales Report</p>
      </div>
      {fromDate && <p className="range">Report from <b>{new Date(fromDate).toLocaleDateString()}</b> to <b>{new Date(toDate).toLocaleDateString()}</b></p>}
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
                  {filteredData.length > 0 ? (
                      <>
                        {filteredData.map((row, index) => (
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
                          <td style={{ fontWeight: 600 }} >Grand Total</td>
                          <td >{formatNaira(grandTotal)}</td>
                        </tr>
                        <tr>
                          <td colSpan="6"></td>
                          <td style={{ fontWeight: 600 }} >Total Profit</td>
                          <td >{formatNaira(totalProfit)}</td>
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
    </div>
  )
})
