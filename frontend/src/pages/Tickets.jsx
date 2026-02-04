import TicketCard from "../components/TicketCard";
import { fetchTickets } from "../services/ticketService";
import useFetch from "../hooks/useFetch";
import { useState } from "react";

const Tickets = () => {
  const { data: tickets, loading, error } = useFetch(fetchTickets);
  const [filter, setFilter] = useState("All");

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  if (error) return (
    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong className="font-bold">Error!</strong>
      <span className="block sm:inline"> Failed to load tickets. Please try again later.</span>
    </div>
  );

  const filteredTickets = filter === "All"
    ? tickets
    : tickets.filter(t => t.status === filter);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Support Tickets</h1>
          <p className="text-gray-500 mt-1">Manage and track customer issues in real-time</p>
        </div>

        <div className="flex space-x-2 bg-white p-1 rounded-lg shadow-sm border border-gray-200">
          {['All', 'Open', 'Resolved'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${filter === status
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {filteredTickets.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-dashed border-gray-300">
          <p className="text-gray-500 text-lg">No tickets found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredTickets.map((ticket) => (
            <TicketCard key={ticket._id} ticket={ticket} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Tickets;
