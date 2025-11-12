// src/Dashboard.jsx
import React, { useState, useEffect } from "react";
import KetQuaHocTap from "./KetQuaHocTap";

const Dashboard = ({ user, setUser }) => {
  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
  };

  return (
    <div className="dashboard">
      <div className="top-bar">
        <h3>Xin chào, {user.username}</h3>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <KetQuaHocTap />
    </div>
  );
};

export default Dashboard;
