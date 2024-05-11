import React from 'react';
import { Link } from 'react-router-dom';
import profilePic from '../../resources/images/human.jpg'; // Adjust the import path
import editProfileIcon from '../../resources/images/settings.png'; // Import icon for Edit Profile
import myBlogsIcon from '../../resources/images/globe.png'; // Import icon for My Blogs
import createBlogIcon from '../../resources/images/loc.png'; // Import icon for Create New Blog
import myDraftsIcon from '../../resources/images/tele.png'; // Import icon for My Drafts
import createCommunityIcon from '../../resources/images/yo.png'; // Import icon for Create New Community
import aboutIcon from '../../resources/images/about_icon.png'; // Import icon for About
import logoutIcon from '../../resources/images/logout_icon.png'; // Import icon for Logout
import './SideBar.css';

function Sidebar() {
  return (
    <div className="Sidebar">
      <div className="profile">
        <img src={profilePic} alt="Profile" className="profilePic" />
        <p className="profileName">Fardin Selim Khan</p>
      </div>
      <Link to="/edit-profile" className="sidebarLink">
        <img src={editProfileIcon} alt="Edit Profile" className="sidebarIcon" />
        Edit Profile
      </Link>

      <Link to="/my-blogs" className="sidebarLink">
        <img src={myBlogsIcon} alt="My Blogs" className="sidebarIcon" />
        My Blogs
      </Link>

      <Link to="/create-blog" className="sidebarLink">
        <img src={createBlogIcon} alt="Create New Blog" className="sidebarIcon" />
        Create New Blog
      </Link>

      <Link to="/my-drafts" className="sidebarLink">
        <img src={myDraftsIcon} alt="My Drafts" className="sidebarIcon" />
        My Drafts
      </Link>

      <Link to="/create-community" className="sidebarLink">
        <img src={createCommunityIcon} alt="Create New Community" className="sidebarIcon" />
        Create New Community
      </Link>

      <div className="sidebarDivider"></div> {/* Vertical line */}
      
      <Link to="/about" className="sidebarLink">
        <img src={aboutIcon} alt="About" className="sidebarIcon" />
        About
      </Link>

      <Link to="/logout" className="sidebarLink">
        <img src={logoutIcon} alt="Logout" className="sidebarIcon" />
        Logout
      </Link>
    </div>
  );
}

export default Sidebar;
