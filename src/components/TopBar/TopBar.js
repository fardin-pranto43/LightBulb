import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './TopBar.css';

function TopBar() {
  const location = useLocation(); // Get the current location

  return (
    <div className="TopBar">
      <div className="logo">Lightbulb</div>
      <div className="menu">
        <NavLink exact to="/" className={`menuItem${location.pathname === '/' ? ' active' : ''}`} >Home</NavLink>
        <NavLink to="/notifications" className={`menuItem${location.pathname === '/notifications' ? ' active' : ''}`} >Notifications</NavLink>
        <NavLink to="/communities" className={`menuItem${location.pathname === '/communities' ? ' active' : ''}`} >Communities</NavLink>
        <NavLink to="/settings" className={`menuItem${location.pathname === '/settings' ? ' active' : ''}`} >Settings</NavLink>
        
      </div>
      <div className="searchBar">
        <input type="text" placeholder="Search" />
      </div>
    </div>
  );
}

export default TopBar;
