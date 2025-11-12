
import React, { useState } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import KetQuaHocTap from "./KetQuaHocTap";

function App() {
  const [user, setUser] = useState(null);

  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route
          path="/"
          element={user ? <KetQuaHocTap /> : <Navigate to="/login" />}
        />
      </Routes>
    </HashRouter>
  );
}

export default App;
