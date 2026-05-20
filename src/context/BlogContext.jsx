import { useState, useContext, createContext, useEffect } from "react";
import { blogAPI } from "../api/blogApi.js";

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const getAllPosts = async () => {
    try {
      const { data } = await blogAPI.getAllPosts();
      setPosts(data);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <BlogContext.Provider value={{ posts }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlog must be used within BlogProvider");
  }
  return context;
};
