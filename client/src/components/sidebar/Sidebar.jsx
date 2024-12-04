import React from 'react'
import './Sidebar.css'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBook, faBagShopping, faHouse, faBoxArchive, faReceipt, faUserFriends, faTruck, faSignOut } from '@fortawesome/free-solid-svg-icons'
import { LogoutBtn } from './LogoutBtn'

export const Sidebar = ({isOpen}) => {
    
  return (
    <>
    <div className={`sidebar ${isOpen ? "active" : ""}`}>
        <div className="logo">
           <span>IMS</span> 
        </div>
        <ul className="side u">
            <li>
                <NavLink className="sideLinks" to="/dashboard"><FontAwesomeIcon icon={faHouse} className='icon' /><span className='nav-item'>Dashboard</span></NavLink>
                <span className="tooltip">Dashboard</span>
            </li>
            <li>
                <NavLink className="sideLinks" to="/sales"><FontAwesomeIcon icon={faBook} className='icon' /><span className="nav-item" >Sales</span></NavLink>
                <span className="tooltip">Order</span>
            </li>
            {/* <li>
                <NavLink className="sideLinks" to="/report"><FontAwesomeIcon icon={faReceipt} className='icon' /><span className="nav-item" >Reports</span></NavLink>
                <span className="tooltip">Report</span>
            </li> */}
            {/* <li>
                <button className="sideLinks" ><FontAwesomeIcon icon={faSignOut} className='icon' /><span className="nav-item" >Logout</span></button>
                <span className="tooltip">Logout</span>
            </li> */}
            <LogoutBtn />
        </ul>
    </div>
    </>
  )
}


export const AdminSidebar = ({isOpen}) => {
    return (
      <>
      <div className={`sidebar ${isOpen ? "active" : ""}`}>
        <div className="logo">
            IMS
        </div>
          <ul className="side">
              <li>
                  <NavLink className="sideLinks" to="/admin/dashboard"><FontAwesomeIcon icon={faHouse} className='icon'/><span className="nav-item" >Dashboard</span></NavLink>
                  <span className="tooltip">Dashboard</span>
              </li>
              <li>
                  <NavLink className="sideLinks" to="/admin/products"><FontAwesomeIcon icon={faBagShopping} className='icon'/><span className="nav-item" >Products</span></NavLink>
                  <span className="tooltip"></span>
              </li>
              <li>
                  <NavLink className="sideLinks" to="/admin/users"><FontAwesomeIcon icon={faUserFriends} className='icon'/><span className="nav-item" >Users</span></NavLink>
                  <span className="tooltip"></span>
              </li>
              <li>
                  <NavLink className="sideLinks" to="/admin/categories"><FontAwesomeIcon icon={faBoxArchive} className='icon'/><span className="nav-item" >Categories</span></NavLink>
                  <span className="tooltip"></span>
              </li>
              <li>
                  <NavLink className="sideLinks" to="/admin/suppliers"><FontAwesomeIcon icon={faTruck} className='icon'/><span className="nav-item" >Suppliers</span></NavLink>
                  <span className="tooltip"></span>
              </li>
              
              <li>
                <NavLink className="sideLinks" to="/sales"><FontAwesomeIcon icon={faBook} className='icon' /><span className="nav-item" >Sales</span></NavLink>
                <span className="tooltip">Order</span>
            </li>

              <li>
                <NavLink className="sideLinks" to="/admin/report"><FontAwesomeIcon icon={faReceipt} className='icon' /><span className="nav-item" >Report</span></NavLink>
                <span className="tooltip">Reports</span>
            </li>
            {/* <li>
                <button className="sideLinks" ><FontAwesomeIcon icon={faSignOut} className='icon' /><span className="nav-item" >Logout</span></button>
                <span className="tooltip">Logout</span>
            </li> */}
            <LogoutBtn />
          </ul>
      </div>
      </>
    )
  }