import { useState } from 'react';
import CombinedCustomerDashboard from './CombinedCustomerDashboard.jsx';

const mockCustomers = [
  { id: 1, name: 'Arun Kumar' },
  { id: 2, name: 'Priya Raj' },
  { id: 3, name: 'Suresh Silva' },
];

export default function CombinedCustomerList() {
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  if (selectedCustomer) {
    return <CombinedCustomerDashboard customer={selectedCustomer} />;
  }

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6">Select a Customer</h2>
      <ul className="space-y-4">
        {mockCustomers.map((customer) => (
          <li key={customer.id}>
            <button
              className="w-full p-4 bg-orange-100 rounded-lg shadow hover:bg-orange-200 text-left text-lg font-medium"
              onClick={() => setSelectedCustomer(customer)}
            >
              {customer.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
} 
