import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AdminSidebar } from "../../components/sidebar/Sidebar";
import { Navbar } from "../../components/navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { AddCategoryModal } from "../../components/Modals/Category Modal/AddCategoryModal";
import { UpdateCategoryModal } from "../../components/Modals/Category Modal/UpdateCategoryModal";
import { Head } from "../../components/Table Head Class/Head";
import DataTable from "react-data-table-component";
import toast from "react-hot-toast";
import axios from "axios";
import { DeleteModal } from "../../components/Modals/Delete Modal/DeleteModal";


export const Category = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [Categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleAddBtn = () => {
    setShowModal(true);
  };

  const handleUpdateBtn = (category) => {
    setSelectedCategory(category);  // Store the product to be updated
    setShowUpdateModal(true); // Show the update modal
  };
  
  const handleDeleteModal =(category)=>{
    setSelectedCategory(category);  // Store the product to be updated
    setShowDeleteModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false);
    setShowUpdateModal(false);
    setShowDeleteModal(false)
    fetchCategories()
  };

  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState);
  };

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/admin/displayCategory");
      const modifiedCategory = response.data.map((category, index) => ({
        ...category,
        customId: index + 1, // Generate a custom ID for display
      }));

      setCategories(modifiedCategory);
      setFilteredCategories(modifiedCategory);
    } catch (error) {
      console.error("Error fetching Category:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories()
}, []);

const handleDeleteBtn = async (id) => {
      try {
        const { data } = await axios.delete(`/api/admin/deleteCategory/${id}`);
        setCategories((prevCategory) => (prevCategory).filter((category) => category._id !== id));
        setFilteredCategories(filteredCategories.filter((category) => category._id !== id));
        setShowDeleteModal(false);
        toast.success(data.message); 
      } catch (error) {
        console.error("Error deleting category:", error);
        const errorMessage = error.response?.data?.message || "Error deleting category. Please try again.";
        toast.error(errorMessage); // Show error message
      }
  };

  const handleSearchFilter = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);

    const filtered = Categories.filter(row => (
      row.categoryName.toLowerCase().includes(value)
    ));
    setFilteredCategories(filtered);
  };

  const columns = [
    {
      name: "ID",
      selector: (row) => row.customId,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.categoryName,
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
              <NavLink to="/admin/dashboard">Dashboard</NavLink> /{" "}
              <NavLink to="/admin/category">Categories</NavLink>
            </div>

            <div className="body">
              <Head
                Click={handleAddBtn}
                Title="Categories"
                btnName="Category"
                Input={handleSearchFilter}
                val={search}
              />
              <div className="table">
                <DataTable 
                columns={columns} 
                data={filteredCategories.length ? filteredCategories : Categories} 
                pagination 
                fixedHeader={true}
                fixedHeaderScrollHeight="500px"
                highlightOnHover
                progressPending={loading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && <AddCategoryModal onClose={handleCloseModal} />}
      {showUpdateModal && <UpdateCategoryModal category={selectedCategory} onClose={handleCloseModal} />}
      {showDeleteModal && <DeleteModal onClose={handleCloseModal} onDelete={() => handleDeleteBtn(selectedCategory._id)} />}
    </>
  );
};
