import React, { useState } from "react";
import "./Login.css";

export default function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("user", JSON.stringify(data.user));
        onLoginSuccess(data.user);
      } else {
        const err = await res.json();
        setError(err.message || "Đăng nhập thất bại!");
      }
    } catch (err) {
      setError("Lỗi kết nối máy chủ!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Đăng nhập hệ thống</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Tên đăng nhập"
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
    </div>
  );
}
