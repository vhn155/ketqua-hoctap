
import React, { useState } from "react";
import "./KetQuaHocTap.css";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        onLogin();
      } else {
        setError("Sai tài khoản hoặc mật khẩu");
      }
    } catch {
      setError("Lỗi kết nối server");
    }
  };

  return (
    <div className="login-container">
      <h2>Đăng nhập hệ thống</h2>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="text"
          placeholder="Tài khoản"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Đăng nhập</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
