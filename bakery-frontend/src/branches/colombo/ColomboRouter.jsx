import { Routes, Route } from 'react-router-dom';
import ColomboDashboard from './ColomboDashboard.jsx';
import ColomboCustomers from './ColomboCustomers.jsx';
import ColomboOrders from './ColomboOrders.jsx';
import ColomboProducts from './ColomboProducts.jsx';
import ColomboInventory from './ColomboInventory.jsx';
import ColomboReports from './ColomboReports.jsx';
import ColomboSettings from './ColomboSettings.jsx';
import ColomboStaff from './ColomboStaff.jsx';
// ... import other Colombo pages ...

export default function ColomboRouter() {
  return (
    <Routes>
      <Route index element={<ColomboDashboard />} />
      <Route path="dashboard" element={<ColomboDashboard />} />
      <Route path="customers" element={<ColomboCustomers />} />
      <Route path="orders" element={<ColomboOrders />} />
      <Route path="products" element={<ColomboProducts />} />
      <Route path="inventory" element={<ColomboInventory />} />
      <Route path="reports" element={<ColomboReports />} />
      <Route path="settings" element={<ColomboSettings />} />
      <Route path="staff" element={<ColomboStaff />} />
      <Route path="test" element={<div style={{color: 'red', fontSize: 40}}>TEST PAGE</div>} />
      {/* ... other routes ... */}
    </Routes>
  );
} 