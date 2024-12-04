import React, { useState, useEffect } from 'react';
import './style.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";
import { BeatLoader } from "react-spinners";
import axios from 'axios';
import { useAuth } from '../../Context/AuthContext';

export const Login = () => {
  const { login, user } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (username === "" || password === "") {
      toast.error("All fields must be filled");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("/auth/login", { username, password });
      login(response.data.user); // Update the user context
      
      const { role } = response.data.user; // Access role inside user object
      const message = response.data.message;

      // Use a separate function to handle redirection
      redirectUser(role);
      
      toast.success(message || "Login successful");
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred during login");
    } finally {
      setLoading(false); // Stop loading regardless of success or error
    }
  };

  // Function to handle user redirection
  const redirectUser = (role) => {
    if (user) {
      navigate(role === 'admin' ? '/admin/dashboard' : '/dashboard');
    }
  };

  useEffect(() => {
    if (user) {
      // Redirect if user is already logged in
      redirectUser(user.role);
    }
  }, [user, navigate]);

  return (
    <>
      <div className="log-con">
        <div className="logleft">
          <img src="/image/back.jpg" loading="lazy" alt="" />
        </div>
        <div className="logright">
          <div className="logo">
            {/* <img src="/image/ABNB_BIG.png" alt="" /> */}
            <h1>Login</h1>
          </div>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* <Link to="/forgotPassword" className="frgt">Forgot password?</Link> */}
            <button 
              className="submit" 
              disabled={loading}
            >
              {loading ? <BeatLoader size={10} color={"#eee"} /> : "Log in"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
