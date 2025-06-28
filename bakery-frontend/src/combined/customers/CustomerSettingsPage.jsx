export default function CustomerSettingsPage({ customer }) {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Settings</h3>
      <div className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input className="w-full p-2 border rounded" value={customer.name} readOnly />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input className="w-full p-2 border rounded" value={customer.email || 'arun@example.com'} readOnly />
        </div>
        <button className="px-4 py-2 bg-orange-400 text-white rounded-lg">Change Password</button>
      </div>
    </div>
  );
} 