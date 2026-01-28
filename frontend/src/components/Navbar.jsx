import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="bg-gray-900 text-white px-6 py-4 flex justify-between">
      <h1 className="text-xl font-bold">Helpdesk Dashboard</h1>
      <div className="space-x-6">
        <Link to="/" className="hover:text-blue-400">SLA</Link>
        <Link to="/tickets" className="hover:text-blue-400">Tickets</Link>
      </div>
    </div>
  );
}

export default Navbar;
