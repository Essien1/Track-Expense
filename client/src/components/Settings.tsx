import  { useState, useEffect } from "react";

const Settings = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [currency, setCurrency] = useState<string>("NGN");
  const [emailNotifications, setEmailNotifications] = useState<boolean>(true);
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  // Load settings from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    const savedCurrency = localStorage.getItem("currency");
    const savedEmailNotifications = localStorage.getItem("emailNotifications");
    const savedFullName = localStorage.getItem("fullName");
    const savedEmail = localStorage.getItem("email");

    if (savedDarkMode !== null) setDarkMode(savedDarkMode === "true");
    if (savedCurrency) setCurrency(savedCurrency);
    if (savedEmailNotifications !== null) setEmailNotifications(savedEmailNotifications === "true");
    if (savedFullName) setFullName(savedFullName);
    if (savedEmail) setEmail(savedEmail);
  }, []);

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
    localStorage.setItem("currency", currency);
    localStorage.setItem("emailNotifications", emailNotifications.toString());
    localStorage.setItem("fullName", fullName);
    localStorage.setItem("email", email);
  }, [darkMode, currency, emailNotifications, fullName, email]);

  return (
    <div className={`max-w-5xl mx-auto p-6 ${darkMode ? "bg-gray-900 text-white" : "bg-white"} rounded-lg shadow-md`}>
      <h2 className="text-2xl font-semibold mb-6">Settings</h2>
      
      {/* Profile Settings */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Profile Settings</h3>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full p-2 border rounded-md mb-2"
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded-md mb-2"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Save</button>
      </div>
      
      {/* Preferences */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Preferences</h3>
        <label className="flex items-center justify-between mb-2">
          {/* <span>Dark Mode</span>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            className="toggle-checkbox"
          /> */}
        </label>
        <label className="block mb-2">Currency</label>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          <option value="NGN">₦ Nigerian Naira</option>
          <option value="USD">$ US Dollar</option>
          <option value="EUR">€ Euro</option>
        </select>
      </div>
      
      {/* Notifications */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Notifications</h3>
        <label className="flex items-center justify-between">
          <span>Email Notifications</span>
          <input
            type="checkbox"
            checked={emailNotifications}
            onChange={() => setEmailNotifications(!emailNotifications)}
            className="toggle-checkbox"
          />
        </label>
      </div>
      
      {/* Security */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Security</h3>
        <button className="bg-red-500 text-white px-4 py-2 rounded-md">Change Password</button>
      </div>
    </div>
  );
};

export default Settings;
