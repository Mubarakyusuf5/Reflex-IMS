import React, { useEffect, useState } from 'react'
import './Navbar.css'
import { faBars, faBell, faBurger, faUserAlt, faUserMd } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { OutDropDown } from '../Dropdown/OutDropDown'
import { useAuth } from "../../Context/AuthContext";


export const Navbar = ({onClick}) => {
  const [show, setIsShow]= useState(false)
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  // const [fullname, setFullname] = useState("Unknown");
  const { role, user, } = useAuth();

  useEffect(() => {
    setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

  }, []);
  const display = ()=>{
    setIsShow(prevShow => !prevShow)
  }
  
  

  const date = currentDateTime.toLocaleDateString('en-US', {dateStyle: "long"})
  const time = currentDateTime.toLocaleTimeString('en-US', {timeStyle: "short"})

  return (
    <>
    <nav className='nav'>
        <div className="open" >
          <FontAwesomeIcon icon={faBars} onClick={onClick} className='bar' />
          <p>{date} {time}</p>
          </div>
          <div className="uCon">
            <FontAwesomeIcon icon={faBell} className='bell' />

            <div className="demo">
            <div className="user">
              <p className="name">{user?.fullname || "Unknown"}</p>
              <p>{role === "admin" ? "admin" : "user"}</p>
            </div>
              <FontAwesomeIcon icon={faUserAlt} className='uIcon' />
            </div>
        </div>
    </nav>
    </>
  )
}
