import React from "react";
import { Link } from "react-router-dom";

export const Frgt = () => {
  return (
    <>
      <div className="log-con">
        <div className="logleft">
          {/* <img src="/image/back.jpg" alt="" /> */}
        </div>
        <div className="logright">
          <div className="logo">
            <img src="/image/ABNB_BIG.png" alt="" />
          </div>
          <form action="" className="frgtf">
            <h3>Reset Password</h3>
            <p className="ins">
              Enter your email address and we'll send you an email with
              instructions to reset your password.
            </p>
            <input type="email" placeholder="Enter email" />
            {/* <input type="password" placeholder='Enter password' /> */}
            <button>Reset Password</button>
            <p className="back">Back to  <Link to="/" className="back">Login</Link></p>
          </form>
        </div>
      </div>
    </>
  );
};
