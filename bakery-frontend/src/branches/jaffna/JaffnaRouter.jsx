import { Routes, Route } from 'react-router-dom';
import JaffnaDashboard from './JaffnaDashboard.jsx';
import JaffnaCustomers from './JaffnaCustomers.jsx';
import JaffnaOrders from './JaffnaOrders.jsx';
import JaffnaProducts from './JaffnaProducts.jsx';
import JaffnaInventory from './JaffnaInventory.jsx';
import JaffnaReports from './JaffnaReports.jsx';
import JaffnaSettings from './JaffnaSettings.jsx';
import JaffnaStaff from './JaffnaStaff.jsx';
// ... import other Jaffna pages ...

export default function JaffnaRouter() {
  return (
    <Routes>
      <Route path="dashboard" element={<JaffnaDashboard />} />
      <Route path="customers" element={<JaffnaCustomers />} />
      <Route path="orders" element={<JaffnaOrders />} />
      <Route path="products" element={<JaffnaProducts />} />
      <Route path="inventory" element={<JaffnaInventory />} />
      <Route path="reports" element={<JaffnaReports />} />
      <Route path="settings" element={<JaffnaSettings />} />
      <Route path="staff" element={<JaffnaStaff />} />
      {/* ... other routes ... */}
    </Routes>
  );
} 
