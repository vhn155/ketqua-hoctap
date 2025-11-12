import React, { useState } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import KetQuaHocTap from "./KetQuaHocTap";

function App() {
  const [user, setUser] = useState(null);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={user ? <KetQuaHocTap user={user} /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
