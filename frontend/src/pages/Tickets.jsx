import { useEffect, useState } from "react";
import api from "../api/axios";
import TicketCard from "../components/TicketCard";

function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [form, setForm] = useState({
    title: "",
    priority: ""
  });

  const fetchTickets = async () => {
    const res = await api.get("/tickets");
    setTickets(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/tickets", form);
    setForm({ title: "", priority: "" });
    fetchTickets();
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Ticket Management</h2>

      <form onSubmit={handleSubmit} className="flex gap-4 mb-6">
        <input
          value={form.title}
          placeholder="Title"
          className="border p-2 rounded w-1/3"
          onChange={(e)=>setForm({...form, title:e.target.value})}
        />
        <input
          value={form.priority}
          placeholder="Priority"
          className="border p-2 rounded w-1/4"
          onChange={(e)=>setForm({...form, priority:e.target.value})}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Create
        </button>
      </form>

      <div className="grid grid-cols-3 gap-4">
        {tickets.map(ticket => (
          <TicketCard 
            key={ticket._id} 
            ticket={ticket} 
            refresh={fetchTickets}
          />
        ))}
      </div>
    </div>
  );
}

export default Tickets;
