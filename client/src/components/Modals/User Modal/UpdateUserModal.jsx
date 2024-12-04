import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { BeatLoader } from 'react-spinners';

export const UpdateUserModal = ({onClose, user}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullname: user?.fullname || "",
    username: user?.username || "",
    email: user?.email || "",
    role: user?.role || "",
    password: user?.password || "",
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
      const response = await axios.put(`/api/admin/updateUser/${user._id}`, formData);
      toast.success(response.data.message);
      onClose();
    } catch (error) {
      console.error("Error updating user:", error);
      const errorMessage = error.response?.data?.message || "Error updating user. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Update User</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name:</label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Role:</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              required
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
              required
            />
          </div>
          <div className="form-actions">
          <button className="submit" disabled={loading}>
              {loading ? <BeatLoader size={10} color={"#eee"} /> : "Update User"}
            </button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
