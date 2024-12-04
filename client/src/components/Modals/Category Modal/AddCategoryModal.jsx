import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { BeatLoader } from 'react-spinners';

export const AddCategoryModal = ({onClose}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    categoryName: '',
  });

  // Step 2: Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value  // Update the specific field in formData
    });
  };

  // Step 3: Handle form submission (for now, just console.log formData)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 

    const { categoryName } = formData; // Destructure formData
    if (!categoryName) {
      toast.error("All fields must be filled");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('/api/admin/createCategory', formData);
      toast.success(response.data.message);
      setFormData({
        categoryName: '',
      });
      onClose();
    } catch (error) {
      console.error("Error creating category:", error);
      const errorMessage = error.response?.data?.message || "Error creating category. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false); // Reset loading state after try/catch
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Add New Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Category Name:</label>
            <input
              type="text"
              name="categoryName"
              value={formData.categoryName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-actions">
          <button className="submit" disabled={loading}>
              {loading ? <BeatLoader size={10} color={"#eee"} /> : "Add Category"}
            </button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
