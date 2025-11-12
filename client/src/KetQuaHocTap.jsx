import React, { useEffect, useState } from "react";
import "./KetQuaHocTap.css";

const KetQuaHocTap = ({ onLogout }) => {
  const [hocSinh, setHocSinh] = useState([]);
  const [search, setSearch] = useState("");
  const [lopFilter, setLopFilter] = useState("");
  const [minDiem, setMinDiem] = useState("");
  const [maxDiem, setMaxDiem] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  const loadData = async () => {
    const res = await fetch("/api/hocSinh");
    const data = await res.json();
    setHocSinh(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const danhSachLop = [...new Set(hocSinh.map((hs) => hs.lop))];

  // Bộ lọc
  const filtered = hocSinh.filter((hs) => {
    const matchTen = hs.ten.toLowerCase().includes(search.toLowerCase());
    const matchLop = lopFilter ? hs.lop === lopFilter : true;
    const matchMin = minDiem ? hs.diemTB >= parseFloat(minDiem) : true;
    const matchMax = maxDiem ? hs.diemTB <= parseFloat(maxDiem) : true;
    return matchTen && matchLop && matchMin && matchMax;
  });

  // Sắp xếp
  const sorted = [...filtered].sort((a, b) => {
    if (!sortConfig.key) return 0;
    let x = a[sortConfig.key];
    let y = b[sortConfig.key];
    if (typeof x === "string") x = x.toLowerCase();
    if (typeof y === "string") y = y.toLowerCase();

    if (x < y) return sortConfig.direction === "asc" ? -1 : 1;
    if (x > y) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction:
        prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const resetFilters = () => {
    setSearch("");
    setLopFilter("");
    setMinDiem("");
    setMaxDiem("");
    setSortConfig({ key: "", direction: "asc" });
  };

  return (
    <div className="kq-container">
      <div className="kq-header">
        <h2>Kết quả học tập</h2>
        <button className="btn-logout" onClick={onLogout}>
          Đăng xuất
        </button>
      </div>

      {/* Bộ lọc */}
      <div className="filter-container">
        <input
          className="filter-input"
          type="text"
          placeholder="Lọc theo tên..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="filter-select"
          value={lopFilter}
          onChange={(e) => setLopFilter(e.target.value)}
        >
          <option value="">Tất cả lớp</option>
          {danhSachLop.map((lop) => (
            <option key={lop} value={lop}>
              {lop}
            </option>
          ))}
        </select>

        <input
          className="filter-number"
          type="number"
          placeholder="Điểm từ..."
          value={minDiem}
          onChange={(e) => setMinDiem(e.target.value)}
          min="0"
          max="10"
        />
        <input
          className="filter-number"
          type="number"
          placeholder="...đến"
          value={maxDiem}
          onChange={(e) => setMaxDiem(e.target.value)}
          min="0"
          max="10"
        />

        <button className="btn-reset" onClick={resetFilters}>
          Đặt lại
        </button>
      </div>

      {/* Bảng hiển thị */}
      <div className="table-container">
        <table className="kq-table">
          <thead>
            <tr>
              <th onClick={() => handleSort("ten")}>
                Tên học sinh{" "}
                {sortConfig.key === "ten" &&
                  (sortConfig.direction === "asc" ? "▲" : "▼")}
              </th>
              <th onClick={() => handleSort("lop")}>
                Lớp{" "}
                {sortConfig.key === "lop" &&
                  (sortConfig.direction === "asc" ? "▲" : "▼")}
              </th>
              <th onClick={() => handleSort("diemTB")}>
                Điểm TB{" "}
                {sortConfig.key === "diemTB" &&
                  (sortConfig.direction === "asc" ? "▲" : "▼")}
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.length > 0 ? (
              sorted.map((hs) => (
                <tr key={hs.id}>
                  <td>{hs.ten}</td>
                  <td>{hs.lop}</td>
                  <td>{hs.diemTB}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="no-result">
                  Không có kết quả phù hợp.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KetQuaHocTap;
