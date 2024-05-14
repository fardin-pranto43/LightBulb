// Home.js
import React from 'react';
import { useBlog } from '../../SidebarPages/CreateBlog/BlogContext';
import './Home.css';
import TopBar from '../../components/TopBar/TopBar';
import Sidebar from '../../components/SideBar/SideBar';

function Home() {
  const { posts } = useBlog();

  return (
    <div className="Home">
      <TopBar />
      <Sidebar />
      <div className="main-content">
        {posts.map((post, index) => (
          <div key={index} className="post-card">
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <div className="button-container">
              <button className="like-button">
                <i className="fas fa-thumbs-up"></i> Like
              </button>
              <button className="comment-button">
                <i className="fas fa-comment"></i> Comment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
