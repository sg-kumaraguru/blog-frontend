import { createContext, useContext, useEffect, useState } from "react";
import { blogAPI } from "../api/blogApi";
import { formatTags } from "../utils/formatTags";

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [posts, setPosts] = useState({ published: [], archived: [], drafts: [] });
  const [loading, setLoading] = useState(true);

  const getMyPosts = async () => {
    try {
      setLoading(true);
      const { data } = await blogAPI.getMyPosts();
      setPosts({
        published: data.published || [],
        archived: data.archived || [],
        drafts: data.drafts || [],
      });
    } catch (error) {
      console.error(error?.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyPosts();
  }, []);

  const saveDraft = async (draftData) => {
    try {
      const payload = { ...draftData, tags: formatTags(draftData.tags), action: "draft" };
      let data;
      if (payload._id) {
        const response = await blogAPI.updatePost(payload._id, payload);
        data = response.data;
      } else {
        const response = await blogAPI.createPost(payload);
        data = response.data;
      }
      setPosts((prev) => {
        const exists = prev.drafts.some((p) => p._id === data._id);
        return {
          ...prev,
          drafts: exists
            ? prev.drafts.map((p) => (p._id === data._id ? data : p))
            : [data, ...prev.drafts],
        };
      });
      return data;
    } catch (error) {
      console.error(error?.response?.data || error.message);
      throw error;
    }
  };

  const publishPost = async (post) => {
    try {
      const payload = {...post, tags:formatTags(post.tags), action:"publish"};
      await blogAPI.publishPost(payload);
      setPosts((prev) => ({
        ...prev,
        drafts: prev.drafts.filter((p) => p._id !== post._id),
        archived: prev.archived.filter((p) => p._id !== post._id),
        published: [{ ...post, status: "published" }, ...prev.published.filter((p) => p._id !== post._id)],
      }));
    } catch (error) {
      console.error(error?.response?.data || error.message);
      throw error;
    }
  };

  const publishPostById = async (post) => {
    try {
      await blogAPI.publishPostById(post._id);
      setPosts((prev) => ({
        ...prev,
        drafts: prev.drafts.filter((p) => p._id !== post._id),
        archived: prev.archived.filter((p) => p._id !== post._id),
        published: [{ ...post, status: "published" }, ...prev.published.filter((p) => p._id !== post._id)],
      }));
    } catch (error) {
      console.error(error?.response?.data || error.message);
      throw error;
    }
  };

  const archivePost = async (post) => {
    try {
      await blogAPI.archivePost(post._id);
      setPosts((prev) => ({
        ...prev,
        published: prev.published.filter((p) => p._id !== post._id),
        archived: [{ ...post, status: "archived" }, ...prev.archived],
      }));
    } catch (error) {
      console.error(error?.response?.data || error.message);
      throw error;
    }
  };

  return (
    <BlogContext.Provider value={{ posts, loading, getMyPosts, saveDraft, publishPost, publishPostById, archivePost }}>
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
