import { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import LoginPage from './components/auth/LoginPage';
import SuperAdminDashboard from './admin/SuperAdminDashboard';
import CombinedProducts from './admin/CombinedProducts';
import JaffnaDashboard from './branches/jaffna/JaffnaDashboard';
import JaffnaCustomers from './branches/jaffna/JaffnaCustomers';
import JaffnaOrders from './branches/jaffna/JaffnaOrders';
import JaffnaSettings from './branches/jaffna/JaffnaSettings';
import JaffnaStaff from './branches/jaffna/JaffnaStaff';
import JaffnaInventory from './branches/jaffna/JaffnaInventory';
import JaffnaProducts from './branches/jaffna/JaffnaProducts';
import JaffnaReports from './branches/jaffna/JaffnaReports';
import CombinedOrders from './admin/CombinedOrders';
import CombinedCustomers from './admin/CombinedCustomers';
import CombinedInventory from './admin/CombinedInventory';
import CombinedStaff from './admin/CombinedStaff';
import CombinedSettings from './admin/CombinedSettings';
import CombinedReports from './admin/CombinedReports';
import ColomboDashboard from './branches/colombo/ColomboDashboard';
import ColomboCustomers from './branches/colombo/ColomboCustomers';
import ColomboOrders from './branches/colombo/ColomboOrders';
import ColomboSettings from './branches/colombo/ColomboSettings';
import ColomboStaff from './branches/colombo/ColomboStaff';
import ColomboInventory from './branches/colombo/ColomboInventory';
import ColomboProducts from './branches/colombo/ColomboProducts';
import ColomboReports from './branches/colombo/ColomboReports';
import Signup from './admin/Signup';

function App() {
  const [user, setUser] = useState(null);
  const [showSignup, setShowSignup] = useState(false);
  const [activeBranch, setActiveBranch] = useState('combined'); // Default to combined for Super Admin
  const [activeBranchPage, setActiveBranchPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Handle login
  const handleLogin = (userData) => {
    setUser(userData);
    // Set default branch based on user role
    if (userData.role === 'super-admin') {
      setActiveBranch('combined');
    } else {
      setActiveBranch('jaffna'); // Default for branch admin
    }
    setActiveBranchPage('dashboard');
  };

  // Handle logout
  const handleLogout = () => {
    setUser(null);
    setActiveBranch('combined');
    setActiveBranchPage('dashboard');
  };

  // When branch changes, always show dashboard
  const handleSetActiveBranch = (branch) => {
    setActiveBranch(branch);
    setActiveBranchPage('dashboard');
  };

  // If user is not logged in, show login or signup page
  if (!user) {
    if (showSignup) {
      return <Signup onShowLogin={() => setShowSignup(false)} />;
    }
    return <LoginPage onLogin={handleLogin} onShowSignup={() => setShowSignup(true)} />;
  }

  // Render content based on user role and active branch
  let content = null;

  if (user.role === 'super-admin') {
    if (activeBranch === 'combined') {
      // Super Admin combined view
      if (activeBranchPage === 'dashboard') content = <SuperAdminDashboard />;
      else if (activeBranchPage === 'products') content = <CombinedProducts />;
      else if (activeBranchPage === 'orders') content = <CombinedOrders />;
      else if (activeBranchPage === 'customers') content = <CombinedCustomers />;
      else if (activeBranchPage === 'inventory') content = <CombinedInventory />;
      else if (activeBranchPage === 'staff') content = <CombinedStaff />;
      else if (activeBranchPage === 'settings') content = <CombinedSettings />;
      else if (activeBranchPage === 'reports') content = <CombinedReports />;
    } else if (activeBranch === 'jaffna') {
      // Super Admin viewing Jaffna branch
      if (activeBranchPage === 'dashboard') content = <JaffnaDashboard />;
      else if (activeBranchPage === 'customers') content = <JaffnaCustomers />;
      else if (activeBranchPage === 'orders') content = <JaffnaOrders />;
      else if (activeBranchPage === 'settings') content = <JaffnaSettings />;
      else if (activeBranchPage === 'staff') content = <JaffnaStaff />;
      else if (activeBranchPage === 'inventory') content = <JaffnaInventory />;
      else if (activeBranchPage === 'products') content = <JaffnaProducts />;
      else if (activeBranchPage === 'reports') content = <JaffnaReports />;
    } else if (activeBranch === 'colombo') {
      // Super Admin viewing Colombo branch
      if (activeBranchPage === 'dashboard') content = <ColomboDashboard />;
      else if (activeBranchPage === 'customers') content = <ColomboCustomers />;
      else if (activeBranchPage === 'orders') content = <ColomboOrders />;
      else if (activeBranchPage === 'settings') content = <ColomboSettings />;
      else if (activeBranchPage === 'staff') content = <ColomboStaff />;
      else if (activeBranchPage === 'inventory') content = <ColomboInventory />;
      else if (activeBranchPage === 'products') content = <ColomboProducts />;
      else if (activeBranchPage === 'reports') content = <ColomboReports />;
    }
  } else {
    // Branch Admin - can only view their assigned branch
    if (activeBranch === 'jaffna') {
      if (activeBranchPage === 'dashboard') content = <JaffnaDashboard />;
      else if (activeBranchPage === 'customers') content = <JaffnaCustomers />;
      else if (activeBranchPage === 'orders') content = <JaffnaOrders />;
      else if (activeBranchPage === 'settings') content = <JaffnaSettings />;
      else if (activeBranchPage === 'staff') content = <JaffnaStaff />;
      else if (activeBranchPage === 'inventory') content = <JaffnaInventory />;
      else if (activeBranchPage === 'products') content = <JaffnaProducts />;
      else if (activeBranchPage === 'reports') content = <JaffnaReports />;
    } else if (activeBranch === 'colombo') {
      if (activeBranchPage === 'dashboard') content = <ColomboDashboard />;
      else if (activeBranchPage === 'customers') content = <ColomboCustomers />;
      else if (activeBranchPage === 'orders') content = <ColomboOrders />;
      else if (activeBranchPage === 'settings') content = <ColomboSettings />;
      else if (activeBranchPage === 'staff') content = <ColomboStaff />;
      else if (activeBranchPage === 'inventory') content = <ColomboInventory />;
      else if (activeBranchPage === 'products') content = <ColomboProducts />;
      else if (activeBranchPage === 'reports') content = <ColomboReports />;
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        activeTab={activeBranchPage}
        setActiveTab={setActiveBranchPage}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeBranch={activeBranch}
        setActiveBranch={handleSetActiveBranch}
        userRole={user.role}
      />
      <div className="flex-1 flex flex-col">
        <Header 
          setSidebarOpen={setSidebarOpen} 
          user={user}
          onLogout={handleLogout}
        />
        <main className="flex-1 overflow-y-auto p-6">
          {content}
        </main>
      </div>
    </div>
  );
}

export default App;