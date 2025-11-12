import React, { useEffect, useState } from "react";
import "./KetQuaHocTap.css";

const KetQuaHocTap = ({ onLogout }) => {
  const [hocSinh, setHocSinh] = useState([]);
  const [search, setSearch] = useState("");

  const loadData = async () => {
    const res = await fetch("/api/hocSinh");
    const data = await res.json();
    setHocSinh(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const filtered = hocSinh.filter(
    (hs) =>
      hs.ten.toLowerCase().includes(search.toLowerCase()) ||
      hs.lop.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="kq-container">
      <div className="kq-header">
        <h2>Kết quả học tập</h2>
        <button className="btn-logout" onClick={onLogout}>
          Đăng xuất
        </button>
      </div>
      <input
        className="kq-search"
        type="text"
        placeholder="Tra cứu theo tên hoặc lớp..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="kq-list">
        {filtered.map((hs) => (
          <div key={hs.id} className="kq-card">
            <h4>{hs.ten}</h4>
            <p>Lớp: {hs.lop}</p>
            <p>Điểm TB: {hs.diemTB}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KetQuaHocTap;
