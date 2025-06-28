import CombinedCustomerSidebar from './CustomerSidebar.jsx';
import CustomerDashboardPage from './CustomerDashboardPage.jsx';
import CustomerProductsPage from './CustomerProductsPage.jsx';
import CustomerOrdersPage from './CustomerOrdersPage.jsx';
import CustomerPromotionsPage from './CustomerPromotionsPage.jsx';
import CustomerSettingsPage from './CustomerSettingsPage.jsx';

export default function CombinedCustomerDashboard({ customer, activeTab, setActiveTab, activeCustomerBranch }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar is now handled by App.jsx */}
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">{customer.name}</h2>
        {activeTab === 'dashboard' && <CustomerDashboardPage customer={customer} />}
        {activeTab === 'products' && <CustomerProductsPage customer={customer} branch={activeCustomerBranch} />}
        {activeTab === 'orders' && <CustomerOrdersPage customer={customer} />}
        {activeTab === 'promotions' && <CustomerPromotionsPage customer={customer} />}
        {activeTab === 'settings' && <CustomerSettingsPage customer={customer} />}
      </div>
    </div>
  );
} 
