import api from "./api";

export const commentsAPI = {
 createComment : (id, data) => api.post(`/comments/post/${id}`, data),
  getMyComments : (id, data) => api.get(`/comments/me/`, data),
  deleteComment : (id) => api.delete(`/comments/${id}`)
};
