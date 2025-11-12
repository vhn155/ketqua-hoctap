import React, { useState, useEffect } from "react";


const KetQuaHocTap = () => {
  const [hocSinh, setHocSinh] = useState([]);
  const [tenMoi, setTenMoi] = useState("");
  const [diemA, setDiemA] = useState("");
  const [diemB, setDiemB] = useState("");
  const [diemC, setDiemC] = useState("");
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  const fetchData = (keyword = "") => {
    const url = keyword ? `/api/hocSinh?search=${encodeURIComponent(keyword)}` : "/api/hocSinh";
    fetch(url)
      .then(res => res.json())
      .then(data => setHocSinh(data));
  };

  useEffect(() => fetchData(), []);
  useEffect(() => {
    const t = setTimeout(() => fetchData(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  const handleAdd = async () => {
    if (!tenMoi) return;
    const res = await fetch("/api/hocSinh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ten: tenMoi, diemA, diemB, diemC })
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
    setTenMoi(hs.ten); setDiemA(hs.diemA); setDiemB(hs.diemB); setDiemC(hs.diemC);
  };

  const handleSave = async (id) => {
    const res = await fetch(`/api/hocSinh/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ten: tenMoi, diemA, diemB, diemC })
    });
    const updated = await res.json();
    setHocSinh(prev => prev.map(h => h.id === id ? updated : h));
    setEditId(null); setTenMoi(""); setDiemA(""); setDiemB(""); setDiemC("");
  };

  return (
    <div className="card">
      <h2>Kết quả học tập</h2>
      <input placeholder="Tìm kiếm..." value={search} onChange={e => setSearch(e.target.value)} />
      <div className="form">
        <input placeholder="Tên học sinh" value={tenMoi} onChange={e => setTenMoi(e.target.value)} />
        <input placeholder="Điểm A" type="number" step="0.1" value={diemA} onChange={e => setDiemA(e.target.value)} />
        <input placeholder="Điểm B" type="number" step="0.1" value={diemB} onChange={e => setDiemB(e.target.value)} />
        <input placeholder="Điểm C" type="number" step="0.1" value={diemC} onChange={e => setDiemC(e.target.value)} />
        {editId ? (
          <button onClick={() => handleSave(editId)}>Lưu</button>
        ) : (
          <button onClick={handleAdd}>Thêm</button>
        )}
      </div>
      <table>
        <thead>
          <tr><th>Tên</th><th>A</th><th>B</th><th>C</th><th>Hành động</th></tr>
        </thead>
        <tbody>
          {hocSinh.map(hs => (
            <tr key={hs.id}>
              <td>{hs.ten}</td>
              <td>{hs.diemA}</td>
              <td>{hs.diemB}</td>
              <td>{hs.diemC}</td>
              <td>
                <button onClick={() => handleEdit(hs)}>Sửa</button>
                <button onClick={() => handleDelete(hs.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default KetQuaHocTap;
