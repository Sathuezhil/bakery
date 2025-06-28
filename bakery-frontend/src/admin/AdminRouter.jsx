import { Routes, Route } from 'react-router-dom';
import AdminDashboard from './Dashboard';
import BranchManagement from './BranchManagement';
import CombinedOrders from './CombinedOrders';
// ... import other admin pages ...

export default function AdminRouter() {
  return (
    <Routes>
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="branches" element={<BranchManagement />} />
      <Route path="combined-orders" element={<CombinedOrders />} />
      {/* ... other routes ... */}
    </Routes>
  );
} 
