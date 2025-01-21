import React, { useState, useEffect } from "react";
import { AdminSidebar } from "../../components/sidebar/Sidebar";
import { Navbar } from "../../components/navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faBoxArchive,
  faChartLine,
  faHouse,
  faTruck,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import DataTable from "react-data-table-component";
import "./Dash.css";
import { Head } from "../../components/Table Head Class/Head";
import { Card } from "../../components/Card/Card";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

export const AdminDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [suppliers, setSuppliers] = useState("");
  const [products, setProducts] = useState("");
  const [categories, setCategories] = useState("");
  const [users, setUsers] = useState("");
  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [overallTotal, setOverallTotal] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate()

  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState);
  };

  useEffect(() => {
    fetchSupplier();
    fetchUser();
    fetchCategory();
    fetchProduct();
    fetchSales();
  }, []);

  const fetchSupplier = async () => {
    try {
      const response = await axios.get("/api/admin/displaySupplier");
      setSuppliers(response.data);
    } catch (error) {
      toast.error("Error fetching suppliers:");
      console.log(error);
    }
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get("/api/admin/displayUser");
      setUsers(response.data);
    } catch (error) {
      toast.error("Error fetching users:");
      console.log(error);
    }
  };

  const fetchCategory = async () => {
    try {
      const response = await axios.get("/api/admin/displayCategory");
      setCategories(response.data);
    } catch (error) {
      toast.error("Error fetching categories:");
      console.log(error);
    }
  };

  const fetchProduct = async () => {
    try {
      const response = await axios.get("/api/admin/displayProduct");
      setProducts(response.data);
    } catch (error) {
      toast.error("Error fetching products:");
      console.log(error);
    }
  };
  const fetchSales = async () => {
    try {
      const response = await axios.get("/api/user/displaySale");
      // setSales(response.data)
      // console.log(response.data)
      const salesRecords = response.data;

      // Flatten itemSales for each record to display in DataTable
      const today = new Date().toLocaleDateString();

      // Filter sales data to only include records from today
      const todaysSalesData = salesRecords
        .flatMap((record, index) =>
          record.itemSales.map((item) => ({
            date: new Date(record.date).toLocaleDateString(),
            overallTotal: record.overallTotal,
            productName: item.productName,
            quantity: item.quantity,
            price: item.price,
            profit: item.profit || 0, // Default to 0 if profit is null
            subTotal: item.subTotal,
          }))
        )
        .filter((sale) => sale.date === today);
      setSales(todaysSalesData);

      const total = salesRecords
        .filter(
          (record) => new Date(record.date).toLocaleDateString() === today
        )
        .reduce((acc, record) => acc + record.overallTotal, 0);

      setOverallTotal(total);
    } catch (error) {
      toast.error("Error displaying sales data");
      console.log(error);
    }
  };

  const handleSearchFilter = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);

    // const filteredProducts = sales.filter(row => (
    //   row.productName.toLowerCase().includes(value)
    // ));
    // setSale(filteredProducts);
  };

  const formatNaira = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  const columns = [
    {
      name: "Product",
      selector: (row) => row.productName,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: "Quantity",
      selector: (row) => row.quantity,
      sortable: true,
    },
    {
      name: "Sub Total",
      selector: (row) => row.subTotal,
      sortable: true,
    },
    {
      name: "profit",
      selector: (row) => row.profit,
      sortable: true,
    },
  ];

  return (
    <div className="container">
      <AdminSidebar isOpen={isOpen} />
      <Navbar onClick={toggleMenu} />
      <div className="content">
        <div className="main">
          <div className="dash">
            <FontAwesomeIcon icon={faHouse} className="icon" />
            <span>Dashboard</span>
          </div>

          <div className="Uwelcome">
              <h1>Welcome {user ? user?.username : "Guest"}</h1>
            </div>

          <div className="cardCon">
            <Card
              amount={products.length}
              title="Products"
              icon={faBagShopping}
              className="card1"
              iconC="icon1"
              link="/admin/products"
            />
            <Card
              amount={users.length}
              title="Users"
              icon={faUserFriends}
              className="card2"
              iconC="icon2"
              link="/admin/users"
            />
            <Card
              amount={categories.length}
              title="Categories"
              icon={faBoxArchive}
              className="card3"
              iconC="icon3"
              link="/admin/categories"
            />
            <Card
              amount={suppliers.length}
              title="Suppliers"
              icon={faTruck}
              className="card4"
              iconC="icon4"
              link="/admin/suppliers"
            />
            <Card
              amount={formatNaira(overallTotal) || 0}
              title="Today's Sales"
              icon={faChartLine}
              className="card5"
              iconC="icon5"
              link="/admin/report"
            />
          </div>

          <div className="dataCon">
            <div className="recentOrder">
              <Head Title="Recent Sales" Input={handleSearchFilter} val={search} />
              <div className="table">
                <DataTable
                  pagination
                  columns={columns}
                  data={sales}
                  fixedHeader={true}
                  fixedHeaderScrollHeight="300px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

