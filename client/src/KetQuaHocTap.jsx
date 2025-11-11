import React, { useState, useEffect } from "react";
import "./KetQuaHocTap.css";

const KetQuaHocTap = () => {
  const [hocSinh, setHocSinh] = useState([]);
  const [tenMoi, setTenMoi] = useState("");
  const [diemA, setDiemA] = useState("");
  const [diemB, setDiemB] = useState("");
  const [diemC, setDiemC] = useState("");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchData = async (keyword = "") => {
    const url = keyword ? `/api/hocSinh?search=${keyword}` : "/api/hocSinh";
    const res = await fetch(url);
    const data = await res.json();
    setHocSinh(data);
  };

  useEffect(() => { fetchData(); }, []);
  useEffect(() => {
    const t = setTimeout(() => fetchData(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tenMoi || diemA === "" || diemB === "" || diemC === "") return;
    const res = await fetch("/api/hocSinh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ten: tenMoi, diemA, diemB, diemC }),
    });
    const newHS = await res.json();
    setHocSinh((prev) => [...prev, newHS]);
    setTenMoi(""); setDiemA(""); setDiemB(""); setDiemC("");
  };

  const handleDelete = async (id) => {
    await fetch(`/api/hocSinh/${id}`, { method: "DELETE" });
    setHocSinh((prev) => prev.filter((h) => h.id !== id));
  };

  const handleSave = async (hs) => {
    await fetch(`/api/hocSinh/${hs.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(hs),
    });
    setEditId(null);
    fetchData();
  };

  return (
    <div className="container">
      <h1>Kết quả học tập 📚</h1>

      <div className="search-row">
        <input
          className="search"
          placeholder="🔍 Tra cứu học sinh..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <input value={tenMoi} onChange={(e) => setTenMoi(e.target.value)} placeholder="Tên học sinh" />
        <input value={diemA} onChange={(e) => setDiemA(e.target.value)} placeholder="Điểm A" type="number" />
        <input value={diemB} onChange={(e) => setDiemB(e.target.value)} placeholder="Điểm B" type="number" />
        <input value={diemC} onChange={(e) => setDiemC(e.target.value)} placeholder="Điểm C" type="number" />
        <button className="btn primary" type="submit">Thêm</button>
      </form>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Học sinh</th><th>A</th><th>B</th><th>C</th><th></th>
            </tr>
          </thead>
          <tbody>
            {hocSinh.length ? hocSinh.map((hs) => (
              <tr key={hs.id}>
                <td>
                  {editId === hs.id ? (
                    <input value={hs.ten} onChange={(e) => setHocSinh(prev =>
                      prev.map(x => x.id === hs.id ? { ...x, ten: e.target.value } : x))} />
                  ) : hs.ten}
                </td>
                <td>{editId === hs.id ?
                  <input value={hs.diemA} onChange={(e) => setHocSinh(prev =>
                    prev.map(x => x.id === hs.id ? { ...x, diemA: e.target.value } : x))} /> : hs.diemA}
                </td>
                <td>{editId === hs.id ?
                  <input value={hs.diemB} onChange={(e) => setHocSinh(prev =>
                    prev.map(x => x.id === hs.id ? { ...x, diemB: e.target.value } : x))} /> : hs.diemB}
                </td>
                <td>{editId === hs.id ?
                  <input value={hs.diemC} onChange={(e) => setHocSinh(prev =>
                    prev.map(x => x.id === hs.id ? { ...x, diemC: e.target.value } : x))} /> : hs.diemC}
                </td>
                <td>
                  {editId === hs.id ? (
                    <button className="btn save" onClick={() => handleSave(hs)}>Lưu</button>
                  ) : (
                    <>
                      <button className="btn edit" onClick={() => setEditId(hs.id)}>Sửa</button>
                      <button className="btn danger" onClick={() => handleDelete(hs.id)}>Xóa</button>
                    </>
                  )}
                </td>
              </tr>
            )) : <tr><td colSpan="5">Không có dữ liệu</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KetQuaHocTap;
