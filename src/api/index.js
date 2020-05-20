import axios from '../axios';

export default {
  get: () => axios.get('/options.json'),
  // getItem: (id) => axios.get(`/posts/${id}.json`),
  // remove: (id) => axios.delete(`/posts/${id}.json`),
  post: (data) => axios.post('/winners.json', data),
  patch: (data) => axios.patch(`/winners.json`, data)
};
