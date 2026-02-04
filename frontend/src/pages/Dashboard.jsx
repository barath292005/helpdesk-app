const Dashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Total Tickets</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">12</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">SLA Breaches</h3>
          <p className="text-3xl font-bold text-red-500 mt-2">3</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Avg Resolution Time</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">2h 15m</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-dashed border-gray-300 text-center">
        <p className="text-gray-500">Analytics Charts Coming Soon...</p>
      </div>
    </div>
  );
};

export default Dashboard;
