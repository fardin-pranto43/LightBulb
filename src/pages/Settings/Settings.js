import React from 'react';
import TopBar from '../../components/TopBar/TopBar'; // Import the TopBar component
import './Settings.css'; // Import the CSS file for styling

function Settings() {
  return (
    <div className="SettingPage">
      <TopBar />
      {/* <h1>Settings</h1> */}

      <div className="settingItem">
        <h2>Email Address</h2>
        <p>example@example.com</p>
      </div>

      <div className="settingItem">
        <h2>Gender</h2>
        <select>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="settingItem">
        <h2>Display Name</h2>
        <p className="description">Set a display name. This does not change your username.</p>
        <input type="text" />
      </div>

      <div className="settingItem2">
        <h2>About</h2>
        <p className="description">A brief description of yourself shown on your profile.</p>
        <input type="text" />
      </div>
    </div>
  );
}

export default Settings;
