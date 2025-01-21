import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useAuth } from "../../Context/AuthContext";

export const LogoutBtn = () => {
  const { logout } = useAuth();

    const handleLogout = async () => {
            logout()
      };
  return (
    <div>
      <li className="last">
        <button onClick={handleLogout} className="sideLinks">
          <FontAwesomeIcon icon={faSignOut} className="icon" />
          <span className="nav-item">Logout</span>
        </button>
        <span className="tooltip">Logout</span>
      </li>
    </div>
  );
};
