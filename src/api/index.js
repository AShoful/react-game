import axios from '../axios';

export default {
  get: () => axios.get(`/posts.json`),
  getItem: (id) => axios.get(`/posts/${id}.json`),
  remove: (id) => axios.delete(`/posts/${id}.json`),
  post: (data) => axios.post('/posts.json', data),
  patch: (data, id) => axios.patch(`/posts/${id}.json`, data)
};
