import { useState } from 'react';

const mockCustomers = [
  { id: 1, username: 'arun', password: 'arun123', name: 'Arun Kumar' },
  { id: 2, username: 'priya', password: 'priya123', name: 'Priya Raj' },
  { id: 3, username: 'suresh', password: 'suresh123', name: 'Suresh Silva' },
];

export default function CustomerLoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const customer = mockCustomers.find(
      (c) => c.username === username && c.password === password
    );
    if (customer) {
      setError('');
      onLogin(customer);
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Customer Login</h2>
        {error && <div className="mb-4 text-red-600">{error}</div>}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Username</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-orange-500 text-white rounded font-semibold hover:bg-orange-600"
        >
          Login
        </button>
      </form>
    </div>
  );
} 
