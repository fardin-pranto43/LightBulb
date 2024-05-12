// Home.js

import React from 'react';
import { useBlog } from '../../SidebarPages/CreateBlog/BlogContext';
import './Home.css';
import TopBar from '../../components/TopBar/TopBar';
import Sidebar from '../../components/SideBar/SideBar';

function Home() {
  const { posts } = useBlog();

  return (
    <div>
      <TopBar />
      <div className="main-content">
        {posts.map((post, index) => (
          <div key={index} className="post-card">
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <div className="button-container">
              <button className="like-button">Like</button>
              <button className="comment-button">Comments</button>
            </div>
          </div>
        ))}
      </div>
      <Sidebar />
    </div>
  );
}

export default Home;
