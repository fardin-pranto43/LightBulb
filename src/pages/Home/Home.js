import React from 'react';
import './Home.css';
import TopBar from '../../components/TopBar/TopBar'; // Adjusted import path
import Sidebar from '../../components/SideBar/SideBar';

function Home() {
  return (
    <div className="Home">
      <TopBar />
      {/* Add rest of the page content here */}
      <Sidebar />
    </div>
  );
}

export default Home;
