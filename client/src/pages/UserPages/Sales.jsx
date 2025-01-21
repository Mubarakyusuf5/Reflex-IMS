import React, { useEffect, useRef, useState } from "react";
import { Crumb } from "../../components/Crumb/Crumb";
import { Sidebar } from "../../components/sidebar/Sidebar";
import { Navbar } from "../../components/navbar/Navbar";
import axios from "axios";
import toast from "react-hot-toast";
import { useReactToPrint } from "react-to-print";
import { Receipt } from "../../components/Printable/Receipt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { BeatLoader } from "react-spinners";
import { DeleteModal } from "../../components/Modals/Delete Modal/DeleteModal";
import { useAuth } from "../../Context/AuthContext";

export const Sales = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [modeOfPayment, setModeOfPayment] = useState("");
  const [saleDetails, setSaleDetails] = useState({
    product: "",
    quantity: 1,
    price: 0,
    subTotal: 0,
  });
  const [deleteIndex, setDeleteIndex] = useState(null);
  const { user } = useAuth();
  // const salesman = user._id

  const contentRef = useRef();

  const toggleMenu = () => setIsOpen((prevState) => !prevState);

  const handleCloseModal = () => setShowDeleteModal(false);

  const handleShowDeleteModal = (index) => {
    setDeleteIndex(index);
    setShowDeleteModal(true);
  };

  const handleDeleteBtn = () => {
    setSales((prevSales) => prevSales.filter((_, i) => i !== deleteIndex));
    handleCloseModal();
  };

  const handleSelectedProduct = (event) => {
    const product = event.target.value;
    const selectedProduct = products.find((p) => p._id === product);

    setSaleDetails((prevDetails) => ({
      ...prevDetails,
      product,
      price: selectedProduct ? selectedProduct.sellingPrice : 0,
    }));
  };

  const addSale = (e) => {
    e.preventDefault();

    if (!saleDetails.product) {
      toast.error("Please select a product.");
      return;
    }

    const productExists = sales.some(
      (sale) => sale.product === saleDetails.product
    );

    if (productExists) {
      toast.error("Product already added to the sales list.");
      return;
    }

    const newSale = {
      ...saleDetails,
      subTotal: saleDetails.quantity * saleDetails.price,
    };

    setSales((prevSales) => [...prevSales, newSale]);
    setSaleDetails({ product: "", quantity: 1, price: 0, subTotal: 0 }); // Reset sale details
  };

  const fetchProduct = async () => {
    try {
      const response = await axios.get("/api/admin/displayProduct");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Error fetching products.");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleReactToPrint = useReactToPrint({contentRef});

  const proceed = async () => {
    if (!modeOfPayment) {
      toast.error("Please select a mode of payment!");
      return;
    }
  
    const itemSales = sales.map((sale) => {
      const product = products.find((p) => p._id === sale.product);
      const productName = product?.productName || "Unknown";
      const profitPerUnit = product ? product.profit : 0;
      const profit = profitPerUnit * sale.quantity;
  
      return {
        product: sale.product,
        productName, 
        quantity: sale.quantity,
        price: sale.price,
        subTotal: sale.subTotal,
        profit,
      };
    });
  
    try {
      setLoading(true);
      await axios.post("/api/user/createSale", {
        itemSales,
        modeOfPayment,
        user:user._id,
        overallTotal,
      });
      // console.log(await axios.post("/api/user/createSale", {
      //   itemSales,
      //   modeOfPayment,
      //   user:user._id,
      //   overallTotal,
      // }))
      toast.success("Sales data submitted successfully!");
      handleReactToPrint();
      setSales([]); // Clear sales after successful submission
      setModeOfPayment(""); // Reset mode of payment after submission
      setSaleDetails({ product: "", quantity: 1, price: 0, subTotal: 0 }); // Reset sale details
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "Error submitting sales data!");
      } else {
        toast.error("Error submitting sales data!");
      }
    } finally {
      setLoading(false);
    }
  };
  

  const overallTotal = sales.reduce((acc, sale) => acc + sale.subTotal, 0);

  return (
    <>
      <div className="container">
        <Sidebar isOpen={isOpen} />
        <Navbar onClick={toggleMenu} />
        <div className="content">
          <div className="main">
            <Crumb
              link1="/dashboard"
              link2="/sales"
              name1="Dashboard"
              name2="Sales"
            />
            <div className="body">
              <div className="head sale">
                <h3>Sales</h3>
                <form onSubmit={addSale} className="select">
                  <select
                    onChange={handleSelectedProduct}
                    value={saleDetails.product}
                  >
                    <option value="">Select Product</option>
                    {products.length > 0 ? (
                      products.map((product) => (
                        <option key={product._id} value={product._id}>
                          {product.productName}
                        </option>
                      ))
                    ) 
                    : 
                    <option value="">No Product Available</option>
                    }
                  </select>
                  <button type="submit">+ Add Sale</button>
                </form>
              </div>
              <div style={{ display: "none" }}>
                <Receipt
                  sales={sales}
                  modeOfPayment={modeOfPayment}
                  overallTotal={overallTotal}
                  ref={contentRef}
                  products={products}
                />
              </div>
              <div className="table">
                <table>
                  <thead>
                    <tr>
                      <th>Item Name</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Sub Total</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sales.length === 0 ? (
                      <tr>
                        <td
                          colSpan={6}
                          style={{ textAlign: "center", fontWeight: "500" }}
                        >
                          Sales Table is Empty
                        </td>
                      </tr>
                    ) : (
                      sales.map((sale, index) => {
                        const productName =
                          products.find((p) => p._id === sale.product)
                            ?.productName || "Unknown";
                        const profit =
                          products.find((p) => p._id === sale.product)
                            ?.profit || "Unknown";
                        return (
                          <tr key={index}>
                            <td>{productName}</td>
                            {/* <td>{profit * sale.quantity}</td> */}
                            <td>
                              <input
                                type="number"
                                className="quan"
                                min={1}
                                value={sale.quantity}
                                onChange={(e) => {
                                  const quantity = parseInt(e.target.value, 10);
                                  setSales((prevSales) => {
                                    const updatedSales = [...prevSales];
                                    updatedSales[index].quantity = quantity;
                                    updatedSales[index].subTotal =
                                      quantity * updatedSales[index].price;
                                    return updatedSales;
                                  });
                                }}
                              />
                            </td>
                            <td>
                              {"\u20A6"}
                              {sale.price}
                            </td>
                            <td>
                              {"\u20A6"}
                              {sale.subTotal}
                            </td>
                            <td>
                              <div className="actBtn">
                                <button style={{ display: "none" }} ></button>
                                <button
                                  onClick={() => handleShowDeleteModal(index)}
                                >
                                  <FontAwesomeIcon icon={faTrashCan} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
                {sales.length > 0 && (
                  <>
                    <label htmlFor="modeOfPayment">Mode of Payment</label>
                    <select
                      id="modeOfPayment"
                      value={modeOfPayment}
                      onChange={(e) => setModeOfPayment(e.target.value)}
                    >
                      <option value="">Select mode of Payment</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="Credit Card">Credit Card</option>
                      <option value="Cash">Cash</option>
                    </select>
                    <p className="total">
                      <b>Overall Total:</b> {"\u20A6"}
                      {overallTotal}
                    </p>
                    <button
                      onClick={proceed}
                      className="proceedBtn"
                      disabled={loading}
                    >
                      {loading ? (
                        <BeatLoader size={10} color={"#eee"} />
                      ) : (
                        "Proceed"
                      )}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showDeleteModal && <DeleteModal onClose={handleCloseModal} onDelete={handleDeleteBtn} />}
    </>
  );
};
