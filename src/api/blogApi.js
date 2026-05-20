import api from "./api";


export const blogAPI = {
  getAllPosts: () => api.get("/post"),
  getPostById: (id) => api.get(`/post/${id}`)
};
