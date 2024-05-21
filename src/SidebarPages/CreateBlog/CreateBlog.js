// CreateBlog.js
import React, { useState } from 'react';
import { useBlog } from './BlogContext';
import TopBar from '../../components/TopBar/TopBar';
import './CreateBlog.css';

function CreateBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { addPost } = useBlog();

  const handlePost = () => {
    if (title && content) {
      addPost({ title, content });
      setTitle('');
      setContent('');
    }
  };

  return (
    <div>
      <TopBar />
      <div className="create-blog">
        <input 
          type="text" 
          placeholder="Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
        <textarea 
          placeholder="Write your blog here..." 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
        />
        <button onClick={handlePost}>Post</button>
        
      </div>
    </div>
  );
}

export default CreateBlog;
