// BlogContext.js

import React, { createContext, useContext, useState } from 'react';

const BlogContext = createContext();

export const useBlog = () => {
  return useContext(BlogContext);
};

export const BlogProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const addPost = (title, content) => {
    // Update the posts state with the new post object
    setPosts([...posts, { title, content }]);
  };

  return (
    <BlogContext.Provider value={{ posts, addPost }}>
      {children}
    </BlogContext.Provider>
  );
};
