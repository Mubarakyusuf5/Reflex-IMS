import React, { useEffect, useState } from 'react';
import { AdminSidebar } from '../../../components/sidebar/Sidebar';
import { Navbar } from '../../../components/navbar/Navbar';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { AddUserModal } from "../../../components/Modals/User Modal/AddUserModal";
import { UpdateUserModal } from "../../../components/Modals/User Modal/UpdateUserModal";
import { Head } from '../../../components/Table Head Class/Head';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import toast from 'react-hot-toast';
import { DeleteModal } from '../../../components/Modals/Delete Modal/DeleteModal';

export const User = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Toggle sidebar menu
  const toggleMenu = () => setIsOpen((prevState) => !prevState);

  // Fetch all users from the API
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/admin/displayUser');
      const modifiedSuppliers = response.data.map((supplier, index) => ({
        ...supplier,
        customId: index + 1, // Generate a custom ID for display
      }));
      setUsers(modifiedSuppliers);
      setFilteredUsers(modifiedSuppliers);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Error fetching users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch and refetch on modal close
  useEffect(() => {
    fetchUsers();
  }, []);

  // Add User button click
  const handleAddBtn = () => setShowModal(true);

  // Update User button click
  const handleUpdateBtn = (user) => {
    setSelectedUser(user);
    setShowUpdateModal(true);
  };
  
  const handleDeleteModal =(user)=>{
    setSelectedUser(user);
    setShowDeleteModal(true)
  }

  // Close modals and refresh data
  const handleCloseModal = () => {
    setShowModal(false);
    setShowUpdateModal(false);
    setShowDeleteModal(false)
    fetchUsers(); // Refresh data after changes
  };

  // Delete user with confirmation
  const handleDeleteBtn = async (id) => {
      try {
        const { data } = await axios.delete(`/api/admin/deleteUser/${id}`);
        setUsers(users.filter((user) => user._id !== id));
        setFilteredUsers(filteredUsers.filter((user) => user._id !== id));
        setShowDeleteModal(false);
        toast.success(data.message);
      } catch (error) {
        console.error("Error deleting user:", error);
        toast.error("Error deleting user. Please try again.");
      }
  };

  // Search and filter users
  const handleSearchFilter = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    setFilteredUsers(users.filter((user) => user.name.toLowerCase().includes(value)));
  };

  // Table columns
  const columns = [
    {
      name: "#",
      selector: (row) => row.customId,
      sortable: true,
    },
    {
      name: "Full Name",
      selector: (row) => row.fullname,
      sortable: true,
    },
    {
      name: "Username",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="actBtn">
          <button onClick={() => handleUpdateBtn(row)}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button onClick={() =>handleDeleteModal(row)}>
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="container">
        <AdminSidebar isOpen={isOpen} />
        <Navbar onClick={toggleMenu} />
        <div className="content">
          <div className="main">
            <div className="crumb">
              <NavLink to="/admin/dashboard">Dashboard</NavLink> / <NavLink to="/admin/user">Users</NavLink>
            </div>

            <div className="body">
              <Head
                Click={handleAddBtn}
                Title="Users"
                btnName="User"
                Input={handleSearchFilter}
                val={search}
              />
              <div className="table">
                <DataTable
                  columns={columns}
                  data={filteredUsers.length ? filteredUsers : users}
                  pagination
                  highlightOnHover
                  fixedHeader={true}
                  fixedHeaderScrollHeight="500px"
                  progressPending={loading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showModal && <AddUserModal onClose={handleCloseModal} />}
      {showUpdateModal && <UpdateUserModal user={selectedUser} onClose={handleCloseModal} />}
      {showDeleteModal && <DeleteModal onClose={handleCloseModal} onDelete={(row) => handleDeleteBtn(selectedUser._id)} />}
    </div>
  );
};
