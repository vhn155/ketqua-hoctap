import React, { useState, useEffect } from "react";
import KetQuaHocTap from "./KetQuaHocTap";
import Login from "./Login";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div>
      {user ? (
        <>
          <div className="header">
            <h2>Xin chào, {user.username}</h2>
            <button className="logout-btn" onClick={handleLogout}>Đăng xuất</button>
          </div>
          <KetQuaHocTap />
        </>
      ) : (
        <Login onLoginSuccess={setUser} />
      )}
    </div>
  );
}

export default App;
