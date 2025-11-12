import React, { useState, useEffect } from "react";
import "./KetQuaHocTap.css";

const KetQuaHocTap = () => {
  const [hocSinh, setHocSinh] = useState([]);
  const [ten, setTen] = useState("");
  const [diemA, setDiemA] = useState("");
  const [diemB, setDiemB] = useState("");
  const [diemC, setDiemC] = useState("");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchData = (keyword = "") => {
    const url = keyword ? `/api/hocSinh?search=${keyword}` : "/api/hocSinh";
    fetch(url)
      .then(res => res.json())
      .then(setHocSinh);
  };

  useEffect(() => fetchData(), []);
  useEffect(() => { const t = setTimeout(() => fetchData(search), 300); return () => clearTimeout(t); }, [search]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!ten) return;
    fetch("/api/hocSinh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ten, diemA, diemB, diemC })
    }).then(res => res.json()).then(newHS => {
      setHocSinh(prev => [...prev, newHS]);
      setTen(""); setDiemA(""); setDiemB(""); setDiemC("");
    });
  };

  const handleDelete = (id) => {
    fetch(`/api/hocSinh/${id}`, { method: "DELETE" })
      .then(() => setHocSinh(prev => prev.filter(h => h.id !== id)));
  };

  const handleEdit = (hs) => {
    setEditId(hs.id);
    setTen(hs.ten); setDiemA(hs.diemA); setDiemB(hs.diemB); setDiemC(hs.diemC);
  };

  const handleSave = (id) => {
    fetch(`/api/hocSinh/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ten, diemA, diemB, diemC })
    }).then(res => res.json()).then(updated => {
      setHocSinh(prev => prev.map(h => h.id === id ? updated : h));
      setEditId(null);
      setTen(""); setDiemA(""); setDiemB(""); setDiemC("");
    });
  };

  return (
    <div className="container">
      <h1>Kết quả học tập</h1>
      <input placeholder="Tìm kiếm..." value={search} onChange={e => setSearch(e.target.value)} />
      <form onSubmit={handleAdd}>
        <input placeholder="Tên" value={ten} onChange={e => setTen(e.target.value)} />
        <input type="number" placeholder="Điểm A" value={diemA} onChange={e => setDiemA(e.target.value)} />
        <input type="number" placeholder="Điểm B" value={diemB} onChange={e => setDiemB(e.target.value)} />
        <input type="number" placeholder="Điểm C" value={diemC} onChange={e => setDiemC(e.target.value)} />
        <button type="submit">Thêm</button>
      </form>

      <table>
        <thead>
          <tr><th>Học sinh</th><th>A</th><th>B</th><th>C</th><th>Hành động</th></tr>
        </thead>
        <tbody>
          {hocSinh.map(hs => (
            <tr key={hs.id}>
              <td>{editId===hs.id ? <input value={ten} onChange={e=>setTen(e.target.value)}/> : hs.ten}</td>
              <td>{editId===hs.id ? <input value={diemA} onChange={e=>setDiemA(e.target.value)}/> : hs.diemA}</td>
              <td>{editId===hs.id ? <input value={diemB} onChange={e=>setDiemB(e.target.value)}/> : hs.diemB}</td>
              <td>{editId===hs.id ? <input value={diemC} onChange={e=>setDiemC(e.target.value)}/> : hs.diemC}</td>
              <td>
                {editId===hs.id ? <button onClick={()=>handleSave(hs.id)}>Lưu</button> :
                  <>
                    <button onClick={()=>handleEdit(hs)}>Sửa</button>
                    <button onClick={()=>handleDelete(hs.id)}>Xóa</button>
                  </>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default KetQuaHocTap;
