import api from "./api";

export const blogAPI = {
  getAllPosts: () => api.get("/post"),
  getPostById: (id) => api.get(`/post/${id}`),
  getMyPosts: () => api.get("/post/me/all"),
  createPost: (data) => api.post("/post", data),
  publishPost: (data) => api.post("/post", data),
  updatePost: (id, data) => api.put(`/post/${id}`, data),
  publishPostById: (id) => api.patch(`/post/${id}/publish`),
  archivePost: (id) => api.patch(`/post/${id}/archive`),
  deletePost: (id) => api.delete(`/post/${id}`),
};
