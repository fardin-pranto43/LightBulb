import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Notifications from './pages/Notifications/Notifications'; // Adjusted import path
import Communities from './pages/Communities/Communities';
import './App.css';
import Settings from './pages/Settings/Settings';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/notifications" element={<Notifications/>} />
          <Route path="/communities" element={<Communities/>} />
          <Route path="/settings" element={<Settings/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
