import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Tickets from "./pages/Tickets";
import SLAManagement from "./pages/SLAManagement";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/sla" element={<SLAManagement />} />
      </Routes>
    </Layout>
  );
}

export default App;
