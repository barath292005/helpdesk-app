import api from "../api/axios";

function TicketCard({ ticket, refresh }) {

  const handleResolve = async () => {
    await api.patch(`/tickets/${ticket._id}/resolve`);
    refresh();
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-4 border">
      <h2 className="text-lg font-semibold">{ticket.title}</h2>
      <p className="text-sm text-gray-600">Priority: {ticket.priority}</p>
      <p className="text-sm">Status: {ticket.status}</p>

      <p className="text-sm">
        Deadline: {ticket.slaDeadline 
          ? new Date(ticket.slaDeadline).toLocaleString()
          : "No SLA Assigned"}
      </p>

      {ticket.escalationLevel > 0 && (
        <span className="mt-2 inline-block bg-red-500 text-white px-3 py-1 rounded-full text-xs">
          Escalation Level {ticket.escalationLevel}
        </span>
      )}

      {ticket.status !== "Resolved" && (
        <button
          onClick={handleResolve}
          className="mt-3 bg-green-600 text-white px-3 py-1 rounded text-sm"
        >
          Resolve
        </button>
      )}
    </div>
  );
}

export default TicketCard;
