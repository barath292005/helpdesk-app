import { useEffect, useState } from "react";
import api from "../api/axios";

function SLA() {
  const [slas, setSlas] = useState([]);
  const [form, setForm] = useState({
    priority: "",
    responseTime: "",
    resolutionTime: ""
  });
  const [editingId, setEditingId] = useState(null);

  const fetchSLAs = async () => {
    const res = await api.get("/sla");
    setSlas(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await api.patch(`/sla/${editingId}`, form);
      setEditingId(null);
    } else {
      await api.post("/sla", form);
    }

    setForm({ priority: "", responseTime: "", resolutionTime: "" });
    fetchSLAs();
  };

  const handleEdit = (sla) => {
    setForm({
      priority: sla.priority,
      responseTime: sla.responseTime,
      resolutionTime: sla.resolutionTime,
    });
    setEditingId(sla._id);
  };

  const handleDelete = async (id) => {
    await api.delete(`/sla/${id}`);
    fetchSLAs();
  };

  useEffect(() => {
    fetchSLAs();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">SLA Management</h2>

      <form onSubmit={handleSubmit} className="flex gap-4 mb-6">
        <input
          value={form.priority}
          placeholder="Priority"
          className="border p-2 rounded"
          onChange={(e)=>setForm({...form, priority:e.target.value})}
        />
        <input
          value={form.responseTime}
          placeholder="Response (min)"
          className="border p-2 rounded"
          onChange={(e)=>setForm({...form, responseTime:e.target.value})}
        />
        <input
          value={form.resolutionTime}
          placeholder="Resolution (min)"
          className="border p-2 rounded"
          onChange={(e)=>setForm({...form, resolutionTime:e.target.value})}
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded">
          {editingId ? "Update SLA" : "Create SLA"}
        </button>
      </form>

      <div className="grid grid-cols-3 gap-4">
        {slas.map(s => (
          <div key={s._id} className="bg-white shadow-md p-4 rounded-xl">
            <h3 className="font-semibold">{s.priority}</h3>
            <p>Response: {s.responseTime} mins</p>
            <p>Resolution: {s.resolutionTime} mins</p>

            <div className="flex gap-3 mt-3">
              <button
                onClick={() => handleEdit(s)}
                className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(s._id)}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SLA;
