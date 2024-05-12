// CreateBlog.js

import React, { useState } from 'react';
import { useBlog } from './BlogContext';
import TopBar from '../../components/TopBar/TopBar';

function CreateBlog() {
  const [title, setTitle] = useState(''); // Assuming you have a state for title
  const [content, setContent] = useState('');
  const { addPost } = useBlog();

  const handlePost = () => {
    // Logic to post the content
    addPost(title, content); // Assuming title is also being set in the component
    // Redirect to home page or any other action
  };

  return (
    <div>
      <TopBar/>
      <div className="create-blog">
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter title" />
        <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Enter content" />
        <button onClick={handlePost}>Post</button>
      </div>
    </div>
  );
}

export default CreateBlog;
