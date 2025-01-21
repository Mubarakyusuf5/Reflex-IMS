import React, { useState, useEffect } from 'react'
import './Dash.css'
import { Sidebar } from '../../components/sidebar/Sidebar'
import { Navbar } from '../../components/navbar/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from "../../Context/AuthContext";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullhorn } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export const UserDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useAuth();

  const toggleMenu = () => {
    setIsOpen(prevState => !prevState);
  };


  return (
    <>
    <div className="container">
      <Sidebar isOpen={isOpen} />
        <Navbar onClick={toggleMenu} />
      <div className="content">
        <div className="main">
          {/* {user.role} */}
            
            <div className="dash">
            <FontAwesomeIcon icon={faHouse} className="icon" />
            <span>Dashboard</span>
          </div>
            <div className="Uwelcome">
              <h1>Welcome {user ? user?.username : "Guest"}</h1>
            </div>

            <Link to="/sales">
            <div className="userCard">
            <FontAwesomeIcon icon={faBullhorn} className="icon icon2" />

              <h3>Sales</h3>
              <p>Click to perform sales</p>
            </div>
            </Link>
          </div>
      </div>
    </div>
    </>
  )
}
