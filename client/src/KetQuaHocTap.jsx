
import React, { useState, useEffect } from "react";
import "./KetQuaHocTap.css";

const KetQuaHocTap = () => {
  const [hocSinh, setHocSinh] = useState([]);
  const [hocSinhGoc, setHocSinhGoc] = useState([]); // dữ liệu gốc để filter
  const [tenMoi, setTenMoi] = useState("");
  const [diemA, setDiemA] = useState("");
  const [diemB, setDiemB] = useState("");
  const [diemC, setDiemC] = useState("");

  const [editId, setEditId] = useState(null);
  const [editTen, setEditTen] = useState("");
  const [editDiemA, setEditDiemA] = useState("");
  const [editDiemB, setEditDiemB] = useState("");
  const [editDiemC, setEditDiemC] = useState("");

  const [search, setSearch] = useState("");
  const [filterName, setFilterName] = useState(""); // thêm bộ lọc tên tại cột

  const fetchData = () => {
    fetch("/api/hocSinh")
      .then(res => res.json())
      .then(data => {
        setHocSinh(data);
        setHocSinhGoc(data);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => { fetchData(); }, []);

  // 🔍 Lọc theo từ khóa tại ô filter
  useEffect(() => {
    if (!filterName.trim()) {
      setHocSinh(hocSinhGoc);
    } else {
      const filtered = hocSinhGoc.filter(hs =>
        hs.ten.toLowerCase().includes(filterName.toLowerCase())
      );
      setHocSinh(filtered);
    }
  }, [filterName, hocSinhGoc]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tenMoi || diemA === "" || diemB === "" || diemC === "") return;
    fetch('/api/hocSinh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ten: tenMoi, diemA, diemB, diemC })
    }).then(res => res.json()).then(newHS => {
      setHocSinh(prev => [...prev, newHS]);
      setHocSinhGoc(prev => [...prev, newHS]);
      setTenMoi(''); setDiemA(''); setDiemB(''); setDiemC('');
    });
  };

  const handleDelete = (id) => {
    fetch(`/api/hocSinh/${id}`, { method: 'DELETE' })
      .then(() => {
        setHocSinh(prev => prev.filter(h => h.id !== id));
        setHocSinhGoc(prev => prev.filter(h => h.id !== id));
      });
  };

  const handleEdit = (hs) => {
    setEditId(hs.id);
    setEditTen(hs.ten);
    setEditDiemA(hs.diemA);
    setEditDiemB(hs.diemB);
    setEditDiemC(hs.diemC);
  };

  const handleSave = (id) => {
    fetch(`/api/hocSinh/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ten: editTen, diemA: editDiemA, diemB: editDiemB, diemC: editDiemC })
    }).then(res => res.json()).then(updated => {
      setHocSinh(prev => prev.map(h => h.id === id ? updated : h));
      setHocSinhGoc(prev => prev.map(h => h.id === id ? updated : h));
      setEditId(null);
    });
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="title">Kết quả học tập</h2>

        <form className="form" onSubmit={handleSubmit}>
          <input value={tenMoi} onChange={e => setTenMoi(e.target.value)} placeholder="Tên học sinh" />
          <input type="number" step="0.1" value={diemA} onChange={e => setDiemA(e.target.value)} placeholder="Điểm A" />
          <input type="number" step="0.1" value={diemB} onChange={e => setDiemB(e.target.value)} placeholder="Điểm B" />
          <input type="number" step="0.1" value={diemC} onChange={e => setDiemC(e.target.value)} placeholder="Điểm C" />
          <button className="btn primary" type="submit">Thêm</button>
        </form>

        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>
                  Học sinh
                  <div>
                    <input
                      type="text"
                      placeholder="Lọc tên..."
                      value={filterName}
                      onChange={e => setFilterName(e.target.value)}
                      className="filter-input"
                    />
                  </div>
                </th>
                <th>A</th>
                <th>B</th>
                <th>C</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {hocSinh.length ? hocSinh.map(hs => (
                <tr key={hs.id}>
                  <td>{editId === hs.id ? <input value={editTen} onChange={e => setEditTen(e.target.value)} /> : hs.ten}</td>
                  <td>{editId === hs.id ? <input type="number" value={editDiemA} onChange={e => setEditDiemA(e.target.value)} /> : hs.diemA}</td>
                  <td>{editId === hs.id ? <input type="number" value={editDiemB} onChange={e => setEditDiemB(e.target.value)} /> : hs.diemB}</td>
                  <td>{editId === hs.id ? <input type="number" value={editDiemC} onChange={e => setEditDiemC(e.target.value)} /> : hs.diemC}</td>
                  <td className="actions">
                    {editId === hs.id ? (
                      <button className="btn save" onClick={() => handleSave(hs.id)}>Lưu</button>
                    ) : (
                      <>
                        <button className="btn edit" onClick={() => handleEdit(hs)}>Sửa</button>
                        <button className="btn danger" onClick={() => handleDelete(hs.id)}>Xóa</button>
                      </>
                    )}
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={5}>Không có dữ liệu</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default KetQuaHocTap;
