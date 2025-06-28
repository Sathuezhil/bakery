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
import CombinedCustomerDashboard from './combined/customers/CombinedCustomerDashboard';
import CustomerSidebar from './combined/customers/CustomerSidebar';

function App() {
  const [user, setUser] = useState(null);
  const [customerUser, setCustomerUser] = useState(null);
  const [showSignup, setShowSignup] = useState(false);
  const [activeBranch, setActiveBranch] = useState('combined');
  const [activeBranchPage, setActiveBranchPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [customerTab, setCustomerTab] = useState('dashboard');
  const [activeCustomerBranch, setActiveCustomerBranch] = useState('jaffna');

  // Unified login handler
  const handleUnifiedLogin = (userData) => {
    if (userData.role === 'super-admin') {
      setUser(userData);
      setActiveBranch('combined');
      setActiveBranchPage('dashboard');
      setCustomerTab('dashboard');
    } else if (userData.role === 'customer') {
      setCustomerUser(userData);
      setCustomerTab('dashboard');
    }
  };

  // Handle logout
  const handleLogout = () => {
    setUser(null);
    setActiveBranch('combined');
    setActiveBranchPage('dashboard');
    setCustomerTab('dashboard');
  };

  // When branch changes, always show dashboard
  const handleSetActiveBranch = (branch) => {
    setActiveBranch(branch);
    setActiveBranchPage('dashboard');
    setCustomerTab('dashboard');
  };

  const handleCustomerSignOut = () => {
    setCustomerUser(null);
    setCustomerTab('dashboard');
    setUser(null);
    setActiveBranch('combined');
    setActiveBranchPage('dashboard');
  };

  // If user is not logged in, show login or signup page
  if (!user && !customerUser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-8">
        <LoginPage onLogin={handleUnifiedLogin} onShowSignup={() => setShowSignup(true)} />
        {showSignup && (
          <Signup onShowLogin={() => setShowSignup(false)} />
        )}
      </div>
    );
  }

  // If customer is logged in, show only their dashboard and sidebar
  if (customerUser) {
    return (
      <div className="flex h-screen bg-gray-50">
        <CustomerSidebar
          activeTab={customerTab}
          setActiveTab={setCustomerTab}
          onSignOut={handleCustomerSignOut}
          activeCustomerBranch={activeCustomerBranch}
          setActiveCustomerBranch={setActiveCustomerBranch}
        />
        <div className="flex-1 flex flex-col">
          <main className="flex-1 overflow-y-auto p-6">
            <CombinedCustomerDashboard
              customer={customerUser}
              activeTab={customerTab}
              setActiveTab={setCustomerTab}
              activeCustomerBranch={activeCustomerBranch}
            />
          </main>
        </div>
      </div>
    );
  }

  // If super admin selects 'customer' branch, show customer sidebar and dashboard
  if (user && user.role === 'super-admin' && activeBranch === 'customer') {
    return (
      <div className="flex h-screen bg-gray-50">
        <CustomerSidebar
          activeTab={customerTab}
          setActiveTab={setCustomerTab}
          onSignOut={handleCustomerSignOut}
          activeBranch={activeBranch}
          setActiveBranch={handleSetActiveBranch}
        />
        <div className="flex-1 flex flex-col">
          <main className="flex-1 overflow-y-auto p-6">
            <CombinedCustomerDashboard customer={{ id: 1, name: 'Arun Kumar' }} activeTab={customerTab} setActiveTab={setCustomerTab} />
          </main>
        </div>
      </div>
    );
  }

  // Render content based on user role and active branch
  let content = null;

  if (user.role === 'super-admin') {
    if (activeBranch === 'customer') {
      content = <CombinedCustomerDashboard customer={{ id: 1, name: 'Arun Kumar' }} activeTab={customerTab} setActiveTab={setCustomerTab} />;
    } else if (activeBranch === 'combined') {
      if (activeBranchPage === 'dashboard') content = <SuperAdminDashboard />;
      else if (activeBranchPage === 'products') content = <CombinedProducts />;
      else if (activeBranchPage === 'orders') content = <CombinedOrders />;
      else if (activeBranchPage === 'customers') content = <CombinedCustomers />;
      else if (activeBranchPage === 'inventory') content = <CombinedInventory />;
      else if (activeBranchPage === 'staff') content = <CombinedStaff />;
      else if (activeBranchPage === 'settings') content = <CombinedSettings />;
      else if (activeBranchPage === 'reports') content = <CombinedReports />;
    } else if (activeBranch === 'jaffna') {
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
