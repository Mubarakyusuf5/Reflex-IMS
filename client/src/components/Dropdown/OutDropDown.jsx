import React, { useState } from 'react'
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDoorOpen, faSignOut, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

export const OutDropDown = ({show}) => {

  return (
    <>
    <div className={`drop ${show ? "show" : ""}`}>
        {/* <button><FontAwesomeIcon icon={faSignOut}/>Logout</button> */}
        <button><FontAwesomeIcon icon={faSignOut} className='icon'/>Logout</button>
    </div>
    </>
  )
}
