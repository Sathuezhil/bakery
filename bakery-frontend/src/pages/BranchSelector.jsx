import { useState } from "react";
import CombinedCustomersRouter from '../combined/customers/CombinedCustomersRouter.jsx';

export default function BranchSelector() {
  const [showCustomer, setShowCustomer] = useState(false);

  if (showCustomer) {
    return <CombinedCustomersRouter />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-8">
      <h1 className="text-3xl font-bold">Select Branch or Customer</h1>
      <div className="flex space-x-4 mb-8">
        <button
          className="px-8 py-4 rounded-lg font-semibold text-lg bg-orange-500 text-white shadow-lg hover:bg-orange-600 transition"
          onClick={() => setShowCustomer(true)}
        >
          Customer
        </button>
      </div>
      <div className="flex space-x-4">
        <button
          className="px-6 py-3 rounded-lg font-semibold text-lg bg-orange-100 text-orange-700 hover:bg-orange-200"
          disabled
        >
          Combined
        </button>
        <button
          className="px-6 py-3 rounded-lg font-semibold text-lg bg-orange-100 text-orange-700 hover:bg-orange-200"
          disabled
        >
          Jaffna
        </button>
        <button
          className="px-6 py-3 rounded-lg font-semibold text-lg bg-orange-100 text-orange-700 hover:bg-orange-200"
          disabled
        >
          Colombo
        </button>
      </div>
      <p className="text-gray-500 mt-4">(Branch admin flow disabled for this demo. Use Customer button above.)</p>
    </div>
  );
} 