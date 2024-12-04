import React, { useEffect, useState } from "react";
import { Navbar } from "../../../components/navbar/Navbar.jsx";
import { AdminSidebar } from "../../../components/sidebar/Sidebar.jsx";
import { NavLink } from "react-router-dom";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { AddProductModal } from "../../../components/Modals/Product Modal/AddProductModal.jsx";
import { UpdateProductModal } from "../../../components/Modals/Product Modal/UpdateProductModal.jsx";
import DataTable from "react-data-table-component";
import { Head } from "../../../components/Table Head Class/Head.jsx";
import axios from "axios";
import toast from "react-hot-toast";
import { DeleteModal } from "../../../components/Modals/Delete Modal/DeleteModal.jsx";

export const Product = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Toggle sidebar
  const toggleMenu = () => setIsOpen((prevState) => !prevState);

  // Add Product button click
  const handleAddBtn = () => setShowModal(true);

  // Update Product button click
  const handleUpdateBtn = (product) => {
    setSelectedProduct(product);
    setShowUpdateModal(true);
  };

  // Open Delete Modal and set the selected product
  const handleDeleteModal = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  // Close modals and refresh data
  const handleCloseModal = () => {
    setShowModal(false);
    setShowUpdateModal(false);
    setShowDeleteModal(false);
    fetchProducts(); // Refresh product data after modal close
  };

  // Fetch all products from the API
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/admin/displayProduct");
      const modifiedProducts = response.data.map((product, index) => ({
        ...product,
        customId: index + 1,
      }));
      setProducts(modifiedProducts);
      setFilteredProducts(modifiedProducts); // Initialize filtered list with all products
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Error fetching products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete product with confirmation
  const handleDeleteBtn = async (id) => {
    try {
      const { data } = await axios.delete(`/api/admin/deleteProduct/${id}`);
      setProducts(products.filter((product) => product._id !== id));
      setFilteredProducts(
        filteredProducts.filter((product) => product._id !== id)
      );
      setShowDeleteModal(false);
      toast.success(data.message);
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Error deleting product. Please try again.");
    }
  };

  // Search and filter products
  const handleSearchFilter = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    setFilteredProducts(
      products.filter((product) => product.name.toLowerCase().includes(value))
    );
  };

  // Table columns
  const columns = [
    {
      name: "ID",
      selector: (row) => row.customId,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.productName,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.category.name,
      sortable: true,
    },
    {
      name: "In Stock",
      selector: (row) => row.inStock,
      sortable: true,
    },
    {
      name: "Buying Price",
      selector: (row) => row.buyingPrice,
      sortable: true,
    },
    {
      name: "Selling Price",
      selector: (row) => row.sellingPrice,
      sortable: true,
    },
    {
      name: "Supplier",
      selector: (row) => row.supplier.name,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="actBtn">
          <button onClick={() => handleUpdateBtn(row)}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button onClick={() => handleDeleteModal(row)}>
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="container">
        <AdminSidebar isOpen={isOpen} />
        <Navbar onClick={toggleMenu} />
        <div className="content">
          <div className="main">
            <div className="crumb">
              <NavLink to="/admin/dashboard">Dashboard</NavLink> /{" "}
              <NavLink to="/admin/product">Product</NavLink>
            </div>

            <div className="body">
              <Head
                Click={handleAddBtn}
                Title="Products"
                btnName="Product"
                Input={handleSearchFilter}
                val={search}
              />
              <div className="table">
                <DataTable
                  columns={columns}
                  data={filteredProducts.length > 0 ? filteredProducts : products}
                  pagination
                  highlightOnHover
                  progressPending={loading}
                  fixedHeader={true}
                  fixedHeaderScrollHeight="500px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showModal && <AddProductModal onClose={handleCloseModal} />}
      {showUpdateModal && (
        <UpdateProductModal
          product={selectedProduct}
          onClose={handleCloseModal}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          onClose={handleCloseModal}
          onDelete={() => handleDeleteBtn(selectedProduct._id)}
        />
      )}
    </>
  );
};
