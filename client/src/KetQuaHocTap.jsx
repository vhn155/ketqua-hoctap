import React, { useState, useEffect } from "react";
import "./KetQuaHocTap.css";

const KetQuaHocTap = ({ user }) => {
  const [hocSinh, setHocSinh] = useState([]);
  const [search, setSearch] = useState("");
  const [tenMoi, setTenMoi] = useState("");
  const [diemA, setDiemA] = useState("");
  const [diemB, setDiemB] = useState("");
  const [diemC, setDiemC] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchData = async (keyword = "") => {
    const res = await fetch(`/api/hocSinh${keyword ? `?search=${encodeURIComponent(keyword)}` : ""}`);
    const data = await res.json();
    setHocSinh(data);
  };

  useEffect(() => { fetchData(); }, []);
  useEffect(() => {
    const t = setTimeout(() => fetchData(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  const handleAdd = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/hocSinh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ten: tenMoi, diemA, diemB, diemC }),
    });
    const newHS = await res.json();
    setHocSinh(prev => [...prev, newHS]);
    setTenMoi(""); setDiemA(""); setDiemB(""); setDiemC("");
  };

  const handleDelete = async (id) => {
    await fetch(`/api/hocSinh/${id}`, { method: "DELETE" });
    setHocSinh(prev => prev.filter(h => h.id !== id));
  };

  const handleEdit = (hs) => {
    setEditId(hs.id);
    setTenMoi(hs.ten);
    setDiemA(hs.diemA);
    setDiemB(hs.diemB);
    setDiemC(hs.diemC);
  };

  const handleSave = async (id) => {
    const res = await fetch(`/api/hocSinh/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ten: tenMoi, diemA, diemB, diemC }),
    });
    const updated = await res.json();
    setHocSinh(prev => prev.map(h => h.id === id ? updated : h));
    setEditId(null);
    setTenMoi(""); setDiemA(""); setDiemB(""); setDiemC("");
  };

  return (
    <div className="container">
      <h2>Xin chào, {user.name}</h2>
      <input placeholder="🔍 Tìm kiếm học sinh..." value={search} onChange={e => setSearch(e.target.value)} />
      <form onSubmit={handleAdd} className="form-add">
        <input placeholder="Tên học sinh" value={tenMoi} onChange={e => setTenMoi(e.target.value)} />
        <input placeholder="Điểm A" type="number" step="0.1" value={diemA} onChange={e => setDiemA(e.target.value)} />
        <input placeholder="Điểm B" type="number" step="0.1" value={diemB} onChange={e => setDiemB(e.target.value)} />
        <input placeholder="Điểm C" type="number" step="0.1" value={diemC} onChange={e => setDiemC(e.target.value)} />
        <button type="submit">{editId ? "Lưu" : "Thêm"}</button>
      </form>
      <table>
        <thead>
          <tr><th>Tên</th><th>A</th><th>B</th><th>C</th><th>Hành động</th></tr>
        </thead>
        <tbody>
          {hocSinh.map(h => (
            <tr key={h.id}>
              <td>{editId === h.id ? <input value={tenMoi} onChange={e => setTenMoi(e.target.value)} /> : h.ten}</td>
              <td>{editId === h.id ? <input type="number" value={diemA} onChange={e => setDiemA(e.target.value)} /> : h.diemA}</td>
              <td>{editId === h.id ? <input type="number" value={diemB} onChange={e => setDiemB(e.target.value)} /> : h.diemB}</td>
              <td>{editId === h.id ? <input type="number" value={diemC} onChange={e => setDiemC(e.target.value)} /> : h.diemC}</td>
              <td>
                {editId === h.id ? 
                  <button onClick={() => handleSave(h.id)}>Lưu</button> :
                  <>
                    <button onClick={() => handleEdit(h)}>Sửa</button>
                    <button onClick={() => handleDelete(h.id)}>Xóa</button>
                  </>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default KetQuaHocTap;
