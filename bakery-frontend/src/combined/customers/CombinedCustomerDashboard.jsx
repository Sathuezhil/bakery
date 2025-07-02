import CombinedCustomerSidebar from './CustomerSidebar.jsx';
import CustomerDashboardPage from './CustomerDashboardPage.jsx';
import CustomerProductsPage from './CustomerProductsPage.jsx';
import CustomerOrdersPage from './CustomerOrdersPage.jsx';
import CustomerPromotionsPage from './CustomerPromotionsPage.jsx';
import CustomerSettingsPage from './CustomerSettingsPage.jsx';

export default function CombinedCustomerDashboard({ customer, activeTab, setActiveTab, activeCustomerBranch, onSignOut }) {
  // Mock data for demo
  const branchStats = {
    jaffna: { totalOrders: 12, loyaltyPoints: 340 },
    colombo: { totalOrders: 7, loyaltyPoints: 210 },
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar is now handled by App.jsx */}
      <div className="flex-1 p-6">
        {activeTab === 'dashboard' && (
          <CustomerDashboardPage customer={customer} activeCustomerBranch={activeCustomerBranch} setActiveTab={setActiveTab} />
        )}
        {activeTab === 'products' && <CustomerProductsPage customer={customer} branch={activeCustomerBranch} />}
        {activeTab === 'orders' && <CustomerOrdersPage customer={customer} branch={activeCustomerBranch} />}
        {activeTab === 'promotions' && <CustomerPromotionsPage customer={customer} />}
        {activeTab === 'settings' && <CustomerSettingsPage customer={customer} onSignOut={onSignOut} />}
      </div>
    </div>
  );
} 
