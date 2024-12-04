import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

export const LogoutBtn = () => {
  const { logout } = useAuth();
  // const navigate = useNavigate()
    const handleLogout = async () => {
        // try {
        //   const response = await axios.post("/auth/logout"); 
        //   if (response.status === 200) {
          //     navigate("/");
          //   }
          // } catch (err) {
            //   console.error("Logout error:", err.response ? err.response.data.message : err.message);
            //   toast.error(err.response?.data?.message || "Failed to log out. Please try again."); 
            // }
            logout()
            // toast.success("Logged out successfully!");
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
