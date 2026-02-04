import { useState, useEffect } from "react";
import { createSLA, getSLAs } from "../services/slaService";

const SLAManagement = () => {
  const [slas, setSlas] = useState([]);
  const [priority, setPriority] = useState("");
  const [responseTime, setResponseTime] = useState("");
  const [resolutionTime, setResolutionTime] = useState("");
  const [loading, setLoading] = useState(true);

  const loadSLAs = async () => {
    try {
      const data = await getSLAs();
      setSlas(data);
    } catch (error) {
      console.error("Failed to fetch SLAs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSLAs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!priority || !responseTime || !resolutionTime) return;

    try {
      await createSLA({ priority, responseTime, resolutionTime });
      // alert("SLA Created Successfuly!"); // Removed alert for cleaner UX
      setPriority("");
      setResponseTime("");
      setResolutionTime("");
      loadSLAs();
    } catch (err) {
      alert("Failed to create SLA");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">SLA Configurations</h1>
        <p className="text-gray-500 mt-1">Define service level agreements for different priorities.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="xl:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 sticky top-24">
            <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
              <span>⚡</span> Create New SLA
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority Level</label>
                <input
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 transition-all"
                  placeholder="e.g. Critical, High, Low"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Response (min)</label>
                  <input
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 transition-all"
                    type="number"
                    placeholder="60"
                    value={responseTime}
                    onChange={(e) => setResponseTime(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Resolution (min)</label>
                  <input
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 transition-all"
                    type="number"
                    placeholder="120"
                    value={resolutionTime}
                    onChange={(e) => setResolutionTime(e.target.value)}
                  />
                </div>
              </div>

              <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-bold hover:shadow-lg hover:to-blue-800 transition transform active:scale-95">
                + Add Configuration
              </button>
            </form>
          </div>
        </div>

        {/* List Section */}
        <div className="xl:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="p-5 font-semibold text-gray-600">Priority</th>
                    <th className="p-5 font-semibold text-gray-600">Response Time</th>
                    <th className="p-5 font-semibold text-gray-600">Resolution Time</th>
                    <th className="p-5 font-semibold text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {slas.map((sla, index) => (
                    <tr key={sla._id} className="border-b border-gray-50 hover:bg-blue-50/50 transition-colors">
                      <td className="p-5">
                        <span className={`px-3 py-1 rounded-full text-sm font-bold 
                                            ${sla.priority.toLowerCase() === 'high' || sla.priority.toLowerCase() === 'critical' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                          {sla.priority}
                        </span>
                      </td>
                      <td className="p-5 font-medium text-gray-700">{sla.responseTime} min</td>
                      <td className="p-5 font-medium text-gray-700">{sla.resolutionTime} min</td>
                      <td className="p-5">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      </td>
                    </tr>
                  ))}
                  {slas.length === 0 && !loading && (
                    <tr>
                      <td colSpan="4" className="p-8 text-center text-gray-400">
                        No SLAs defined yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SLAManagement;
