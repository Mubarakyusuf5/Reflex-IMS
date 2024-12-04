import React, { useState, useEffect } from 'react';
import "../Modal.css";
import toast from 'react-hot-toast';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';

export const UpdateProductModal = ({ onClose, product }) => {
  const [loading, setLoading] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    productName: product.productName || '',
    category: product.category || { id: '', name: '' },
    inStock: product.inStock || '',
    buyingPrice: product.buyingPrice || '',
    sellingPrice: product.sellingPrice || '',
    supplier: product.supplier || { id: '', name: '' }
  });

  useEffect(() => {
    fetchSuppliers();
    fetchCategories();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get('/api/admin/displaySupplier');
      setSuppliers(response.data);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
      toast.error("Error fetching suppliers.");
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/admin/displayCategory');
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Error fetching categories.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = categories.find(category => category._id === e.target.value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      category: {
        id: selectedCategory._id,
        name: selectedCategory.categoryName
      }
    }));
  };

  const handleSupplierChange = (e) => {
    const selectedSupplier = suppliers.find(supplier => supplier._id === e.target.value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      supplier: {
        id: selectedSupplier._id,
        name: selectedSupplier.supplierName
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { productName, category, inStock, buyingPrice, sellingPrice, supplier } = formData;
    if (!productName || !category.id || !inStock || !buyingPrice || !sellingPrice || !supplier.id) {
      toast.error("All fields must be filled");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.put(`/api/admin/updateProduct/${product._id}`, {
        ...formData,
        category: { id: category.id, name: category.name },
        supplier: { id: supplier.id, name: supplier.name }
      });
      toast.success(response.data.message);
    //   onUpdate(); // Refresh data after update
      onClose();  // Close the modal
    } catch (error) {
      console.error("Error updating product:", error);
      const errorMessage = error.response?.data?.message || "Error updating product. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Update Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product Name:</label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Category:</label>
            <select
              name="category"
              value={formData.category.id}
              onChange={handleCategoryChange}
              required
            >
              <option value="">Select a Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>In Stock:</label>
            <input
              type="number"
              name="inStock"
              value={formData.inStock}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Buying Price:</label>
            <input
              type="text"
              name="buyingPrice"
              value={formData.buyingPrice}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Selling Price:</label>
            <input
              type="text"
              name="sellingPrice"
              value={formData.sellingPrice}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Supplier:</label>
            <select
              name="supplier"
              value={formData.supplier.id}
              onChange={handleSupplierChange}
              required
            >
              <option value="">Select a Supplier</option>
              {suppliers.map((supplier) => (
                <option key={supplier._id} value={supplier._id}>
                  {supplier.supplierName}
                </option>
              ))}
            </select>
          </div>
          <div className="form-actions">
            <button className="submit" disabled={loading}>
              {loading ? <BeatLoader size={10} color={"#eee"} /> : "Update Product"}
            </button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};
