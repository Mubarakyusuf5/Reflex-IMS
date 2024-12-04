import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";

export const AddSupplierModal = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    supplierName: "",
    address: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 

    const { supplierName, address } = formData; // Destructure formData
    if (supplierName === "" || address === "") {
      toast.error("All fields must be filled");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('/api/admin/createSupplier', formData);
      toast.success(response.data.message);
      setFormData({
        supplierName: '',
        address: ''
      });
      onClose();
    } catch (error) {
      console.error("Error creating supplier:", error);
      const errorMessage = error.response?.data?.message || "Error creating supplier. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false); // Reset loading state after try/catch
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Add New Supplier</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Supplier Name:</label>
            <input
              type="text"
              name="supplierName"
              value={formData.supplierName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Supplier Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-actions">
            <button className="submit" disabled={loading}>
              {loading ? <BeatLoader size={10} color={"#eee"} /> : "Add Supplier"}
            </button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
