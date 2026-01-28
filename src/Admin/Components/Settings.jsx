import React, { useState, useEffect } from "react";

const Setting = () => {
  // Profile state
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Notifications state
  const [notifications, setNotifications] = useState({
    emailTokens: false,
    smsUrgent: false,
    dailySummary: false,
  });

  // Fetch existing settings (placeholder)
  useEffect(() => {
    // Example: fetch from backend
    // fetch("/api/admin/settings")
    //   .then(res => res.json())
    //   .then(data => {
    //     setProfile(data.profile);
    //     setNotifications(data.notifications);
    //   });
  }, []);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotifications((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send updated settings to backend
    // fetch("/api/admin/settings", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ profile, notifications }),
    // });
    console.log("Profile:", profile);
    console.log("Notifications:", notifications);
    alert("Settings saved successfully!");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Settings</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md space-y-6"
      >
        {/* Profile Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Profile</h2>
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleProfileChange}
              placeholder="Name"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleProfileChange}
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="password"
              name="password"
              value={profile.password}
              onChange={handleProfileChange}
              placeholder="Password"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
        </div>

        {/* Notifications Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Notifications</h2>
          <div className="space-y-3">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="emailTokens"
                checked={notifications.emailTokens}
                onChange={handleNotificationChange}
                className="w-4 h-4"
              />
              <span>Email notifications for new tokens</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="smsUrgent"
                checked={notifications.smsUrgent}
                onChange={handleNotificationChange}
                className="w-4 h-4"
              />
              <span>SMS notifications for urgent requests</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="dailySummary"
                checked={notifications.dailySummary}
                onChange={handleNotificationChange}
                className="w-4 h-4"
              />
              <span>Daily summary reports</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default Setting;
