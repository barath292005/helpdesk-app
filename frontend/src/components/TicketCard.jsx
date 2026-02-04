import { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";
import { acknowledgeEscalation } from "../services/ticketService";

const TicketCard = ({ ticket }) => {
  const socket = useSocket();
  const [currentTicket, setCurrentTicket] = useState(ticket);
  const [timeLeft, setTimeLeft] = useState("");
  const [breachWarning, setBreachWarning] = useState("bg-white");
  const [showHistory, setShowHistory] = useState(false);

  const handleAcknowledge = async () => {
    try {
      await acknowledgeEscalation(currentTicket._id);
      // Socket update will handle the UI refresh
    } catch (err) {
      alert("Failed to acknowledge escalation");
    }
  };

  useEffect(() => {
    if (!socket) return;

    socket.on("ticket_updated", (updatedTicket) => {
      if (updatedTicket._id === currentTicket._id) {
        setCurrentTicket(updatedTicket);
      }
    });

    return () => socket.off("ticket_updated");
  }, [socket, currentTicket._id]);

  useEffect(() => {
    const timer = setInterval(() => {
      // If resolved OR acknowledged, stop the 'panic' visual
      if (currentTicket.status === 'Resolved' || currentTicket.status === 'Waiting for Customer') {
        setTimeLeft(currentTicket.status === 'Resolved' ? 'Resolved' : 'Paused (Waiting)');
        setBreachWarning(currentTicket.status === 'Resolved' ? "bg-green-50 border-green-500" : "bg-purple-50 border-purple-500");

        const progressBar = document.getElementById(`progress-${currentTicket._id}`);
        if (progressBar) {
          progressBar.style.width = currentTicket.status === 'Resolved' ? '100%' : '50%';
          progressBar.className = `h-full rounded-full transition-all duration-1000 ${currentTicket.status === 'Resolved' ? 'bg-green-500' : 'bg-purple-500'}`;
        }
        return;
      }

      const deadline = new Date(currentTicket.resolutionDeadline);
      const created = new Date(currentTicket.createdAt);
      const now = new Date();

      if (!currentTicket.resolutionDeadline || isNaN(deadline.getTime())) {
        setTimeLeft("No Deadline");
        setBreachWarning("bg-white border-gray-200");
        return;
      }

      const diff = deadline - now;
      const totalDuration = deadline - created;
      const elapsed = now - created;

      // Progress Calculation
      let progress = (elapsed / totalDuration) * 100;
      if (progress > 100) progress = 100;
      if (progress < 0) progress = 0;

      const progressBar = document.getElementById(`progress-${currentTicket._id}`);
      if (progressBar) {
        const progressBarColor = progress > 75 ? 'bg-red-500' : progress > 50 ? 'bg-yellow-500' : 'bg-green-500';
        progressBar.style.width = `${progress}%`;
        progressBar.className = `h-full rounded-full transition-all duration-1000 ${progressBarColor}`;
      }

      if (diff <= 0) {
        setTimeLeft("0m (Breached)");
        // If acknowledged, show Orange instead of Red Pulse
        setBreachWarning(currentTicket.escalationAcknowledged ? "bg-orange-50 border-orange-400" : "bg-red-50 border-red-500");
      } else {
        const minutesLeft = Math.floor(diff / 60000);
        setTimeLeft(`${minutesLeft}m remaining`);

        if (minutesLeft < 60) setBreachWarning("bg-yellow-50 border-yellow-500");
        else setBreachWarning("bg-white border-gray-200");
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [currentTicket]);

  return (
    <div className={`p-5 mb-4 rounded-xl shadow-md border-t-4 transition-all duration-300 bg-white ${breachWarning} hover:shadow-xl`}>
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-bold text-gray-800">{currentTicket.subject}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase border ${currentTicket.priority === 'High' || currentTicket.priority === 'Critical' ? 'border-red-200 text-red-600 bg-red-50' : 'border-blue-200 text-blue-600 bg-blue-50'}`}>
              {currentTicket.priority}
            </span>
            <span className="text-xs text-gray-400">#{currentTicket._id.slice(-6)}</span>
          </div>
        </div>
        <div className="text-right">
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase shadow-sm ${currentTicket.status === 'Open' ? 'bg-blue-100 text-blue-700' :
              currentTicket.status === 'Resolved' ? 'bg-green-100 text-green-700' :
                currentTicket.status === 'Waiting for Customer' ? 'bg-purple-100 text-purple-700' :
                  'bg-gray-100 text-gray-700'
            }`}>
            {currentTicket.status}
          </span>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{currentTicket.description}</p>

      <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Resolution SLA</span>
          <span className={`font-mono font-bold ${timeLeft.includes('Breached') ? 'text-red-600' : 'text-gray-700'}`}>
            {timeLeft}
          </span>
        </div>
        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <div id={`progress-${currentTicket._id}`} className="h-full bg-green-500 w-0 rounded-full"></div>
        </div>

        <div className="flex justify-between mt-2 text-xs">
          <div className="flex items-center gap-1">
            <span className="text-gray-400">Response Due:</span>
            <span className="text-gray-700 font-medium">
              {currentTicket.responseDeadline ? new Date(currentTicket.responseDeadline).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-gray-400">Resolve By:</span>
            <span className="text-gray-700 font-medium">
              {currentTicket.resolutionDeadline ? new Date(currentTicket.resolutionDeadline).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'}
            </span>
          </div>
        </div>
      </div>

      {/* Role-Based Escalation Alert */}
      {currentTicket.escalated && (
        <div className={`mt-3 border px-3 py-2 rounded-lg text-xs font-bold flex flex-col gap-2 ${currentTicket.escalationAcknowledged
            ? 'bg-orange-50 border-orange-200 text-orange-800' // Acknowledged State
            : currentTicket.escalatedTo === 'Manager'
              ? 'bg-red-50 border-red-100 text-red-700 animate-pulse' // Hot State (Manager)
              : 'bg-orange-50 border-orange-100 text-orange-700 animate-pulse' // Hot State (Admin)
          }`}>
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center">
              <span className="mr-2 text-lg">{currentTicket.escalationAcknowledged ? '✅' : '🔥'}</span>
              {currentTicket.escalationAcknowledged
                ? 'Escalation Acknowledged'
                : `Escalated to ${currentTicket.escalatedTo || 'Manager'}`
              }
            </div>

            {!currentTicket.escalationAcknowledged && (
              <button
                onClick={handleAcknowledge}
                className="bg-white border border-red-300 text-red-600 px-3 py-1 rounded shadow-sm hover:bg-red-50 transition-colors"
              >
                Acknowledge
              </button>
            )}
          </div>
        </div>
      )}

      {/* Audit Logs Toggle */}
      {currentTicket.history && currentTicket.history.length > 0 && (
        <div className="mt-3">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="text-xs text-gray-500 hover:text-blue-600 underline"
          >
            {showHistory ? 'Hide History' : 'View History'}
          </button>

          {showHistory && (
            <div className="mt-2 bg-gray-50 p-2 rounded border border-gray-100 text-xs">
              {currentTicket.history.map((log, index) => (
                <div key={index} className="flex gap-2 mb-1 border-b border-gray-200 last:border-0 pb-1">
                  <span className="text-gray-400 w-16 whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <div>
                    <span className="font-bold text-gray-700">{log.action}: </span>
                    <span className="text-gray-600">{log.message}</span>
                    <span className="ml-1 text-gray-400 italic">({log.role})</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TicketCard;
