import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { BlogProvider } from '../src/SidebarPages/CreateBlog/BlogContext'; // Import BlogProvider
import Home from './pages/Home/Home';
import Notifications from './pages/Notifications/Notifications';
import Communities from './pages/Communities/Communities';
import Settings from './pages/Settings/Settings';
import EditProfile from './SidebarPages/EditProfile/EditProfile';
import CreateBlog from './SidebarPages/CreateBlog/CreateBlog';
import CreateCommunity from './SidebarPages/CreateCommunity/CreateCommunity';
import MyBlogs from './SidebarPages/MyBlogs/MyBlogs';
import MyDrafts from './SidebarPages/MyDrafts/MyDrafts';

function App() {
  return (
    <Router>
      <BlogProvider> {/* Wrap your application with BlogProvider */}
        <div className="App">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/communities" element={<Communities />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/sidebar-pages/edit-profile" element={<EditProfile />} />
            <Route path="/sidebar-pages/create-blog" element={<CreateBlog />} />
            <Route path="/sidebar-pages/create-community" element={<CreateCommunity />} />
            <Route path="/sidebar-pages/my-blogs" element={<MyBlogs />} />
            <Route path="/sidebar-pages/my-drafts" element={<MyDrafts />} />
          </Routes>
        </div>
      </BlogProvider>
    </Router>
  );
}

export default App;
