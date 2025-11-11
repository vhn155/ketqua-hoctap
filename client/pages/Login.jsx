import React, { useState } from "react";

const API_URL = "/api/auth";

const Login = ({ login }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        login(data.token);
      } else {
        setErr(data.message);
      }
    } catch (error) {
      setErr("Lỗi server");
    }
  };

  return (
    <div className="container">
      <div className="card login-card">
        <h1 className="title">Đăng nhập</h1>
        {err && <div className="error">{err}</div>}
        <form className="form" onSubmit={handleSubmit}>
          <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          <button className="btn primary" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
