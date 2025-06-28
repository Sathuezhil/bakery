import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  return (
    <div>
      <h2>Customer Dashboard</h2>
      {user && (
        <div>
          <p>Welcome, <b>{user.name}</b>!</p>
          <p>Your role: <b>{user.role}</b></p>
        </div>
      )}
      <p>Here you can view your orders, track status, and more.</p>
    </div>
  );
} 
