import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./card.css"
import { Link, NavLink } from 'react-router-dom';

export const Card = ({amount, title, icon, className, iconC, link}) => {
  return (
    <div>
      <div className="cardCon">
      <Link to={link}>
            <div className={`card ${className}`}>
              <div className="text">
                <h4>{amount}</h4>
                <p>{title}</p>
              </div>
              <FontAwesomeIcon icon={icon} className={`icon ${iconC}`} />
            </div>         
      </Link>
          </div>
    </div>
  )
}
