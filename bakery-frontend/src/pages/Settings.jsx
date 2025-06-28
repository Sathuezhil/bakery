import { useState } from "react";

export default function Settings() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
  });
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
  });

  const handleProfileChange = (key, value) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
  };

  const handleNotificationChange = (key, value) => {
    setNotifications((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Save logic here (API call)
    alert("Settings saved!");
  };

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto", padding: 20, background: "#fff", borderRadius: 8, boxShadow: "0 2px 8px #eee" }}>
      <h2>Settings</h2>
      <form onSubmit={handleSave}>
        <div style={{ marginBottom: 16 }}>
          <label>Name:</label>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => handleProfileChange("name", e.target.value)}
            style={{ width: "100%", padding: 8, marginTop: 4 }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Email:</label>
          <input
            type="email"
            value={profile.email}
            onChange={(e) => handleProfileChange("email", e.target.value)}
            style={{ width: "100%", padding: 8, marginTop: 4 }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>
            <input
              type="checkbox"
              checked={notifications.email}
              onChange={(e) => handleNotificationChange("email", e.target.checked)}
            />
            Email Notifications
          </label>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>
            <input
              type="checkbox"
              checked={notifications.sms}
              onChange={(e) => handleNotificationChange("sms", e.target.checked)}
            />
            SMS Notifications
          </label>
        </div>
        <button type="submit" style={{ padding: "8px 16px", background: "#f59e42", color: "#fff", border: "none", borderRadius: 4 }}>
          Save
        </button>
      </form>
    </div>
  );
} 