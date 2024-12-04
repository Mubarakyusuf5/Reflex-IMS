import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AdminSidebar } from "../../components/sidebar/Sidebar";
import { Navbar } from "../../components/navbar/Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { AddSupplierModal } from '../../components/Modals/Supplier Modal/AddSupplierModal';
import { UpdateSupplierModal } from '../../components/Modals/Supplier Modal/UpdateSupplierModal';
import { Head } from '../../components/Table Head Class/Head';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import toast from 'react-hot-toast';
import { DeleteModal } from '../../components/Modals/Delete Modal/DeleteModal';

export const Supplier = () => {
  
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [suppliers, setSupplier] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const handleAddBtn = () => setShowModal(true);
  
  const handleUpdateBtn = (supplier) => {
    setSelectedSupplier(supplier);
    setShowUpdateModal(true);
  };
  
  const handleDeleteModal =(supplier)=>{
    setSelectedSupplier(supplier);
    setShowDeleteModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false);
    setShowUpdateModal(false);
    setShowDeleteModal(false)
    fetchSuppliers(); // Refresh supplier data after closing the modal
  };

  const fetchSuppliers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/admin/displaySupplier");
      const modifiedSuppliers = response.data.map((supplier, index) => ({
        ...supplier,
        customId: index + 1, // Generate a custom ID for display
      }));

      setSupplier(modifiedSuppliers);
      setFilteredSuppliers(modifiedSuppliers);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      fetchSuppliers()
  }, []);

  const toggleMenu = () => setIsOpen(prevState => !prevState);

  const handleDeleteBtn = async (id) => {
      try {
        const { data } = await axios.delete(`/api/admin/deleteSupplier/${id}`);
        setSupplier((prevSuppliers) => (prevSuppliers).filter((supplier) => supplier._id !== id));
        setFilteredSuppliers(filteredSuppliers.filter((supplier) => supplier._id !== id));
        setShowDeleteModal(false);
        toast.success(data.message); 
      } catch (error) {
        console.error("Error deleting supplier:", error);
        const errorMessage = error.response?.data?.message || "Error deleting supplier. Please try again.";
        toast.error(errorMessage); // Show error message
      }
  };

  const handleSearchFilter = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);

    const filtered = suppliers.filter(row => (
      row.supplierName.toLowerCase().includes(value)
    ));
    setFilteredSuppliers(filtered);
  };

  const columns = [
    {
      name: "ID",
      selector: (row) => row.customId,
      sortable: true,
    },
    {
      name: "Supplier Name",
      selector: (row) => row.supplierName,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => row.address,
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
    <>
      <div className="container">
        <AdminSidebar isOpen={isOpen} />
        <Navbar onClick={toggleMenu} />
        <div className="content">
          <div className="main">
            <div className="crumb">
              <NavLink to="/admin/dashboard">Dashboard</NavLink> / <NavLink to="/admin/supplier">Suppliers</NavLink>
            </div>

            <div className="body">
              <Head Click={handleAddBtn} Title="Suppliers" btnName="Supplier" Input={handleSearchFilter} val={search} />
              <div className="table">
                <DataTable
                  columns={columns}
                  data={filteredSuppliers.length ? filteredSuppliers : suppliers}
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
      {showModal && <AddSupplierModal onClose={handleCloseModal} />}
      {showUpdateModal && (
        <UpdateSupplierModal supplier={selectedSupplier} onClose={handleCloseModal} />
      )}
      {showDeleteModal && <DeleteModal onClose={handleCloseModal} onDelete={() => handleDeleteBtn(selectedSupplier._id)} />}
    </>
  );
};
