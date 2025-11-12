import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import KetQuaHocTap from "./KetQuaHocTap";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="ketquahoctap" element={<KetQuaHocTap />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
