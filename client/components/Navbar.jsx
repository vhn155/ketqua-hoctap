import React from "react";

const Navbar = ({ logout }) => (
  <div className="navbar">
    <h2>Kết quả học tập</h2>
    <button className="btn danger" onClick={logout}>Logout</button>
  </div>
);

export default Navbar;
