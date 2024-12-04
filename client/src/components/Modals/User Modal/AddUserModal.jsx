import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { BeatLoader } from 'react-spinners';

export const AddUserModal = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    email: '',
    role: '',
    password: '',
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,  // Update the specific field in formData
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { fullname, username, email, role, password } = formData;
    if (!fullname || !username || !email || !role || !password) {
      toast.error("All fields except password must be filled.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('/auth/register', formData);
      toast.success(response.data.message);
      setFormData({
        fullname: '',
        username: '',
        email: '',
        role: '',
        password: '',
      });
      onClose();
    } catch (error) {
      console.error("Error creating user:", error);
      const errorMessage = error.response?.data?.message || "Error creating user. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Add New User</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name:</label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Role:</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
            >
              <option value="">Choose a role</option>
              <option value="admin">admin</option>
              <option value="user">user</option>
            </select>
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-actions">
          <button className="submit" disabled={loading}>
              {loading ? <BeatLoader size={10} color={"#eee"} /> : "Add User"}
            </button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};
