import axios from '../axios';

export default {
  get: () => axios.get('/options.json'),
  post: (data) => axios.post('/winners.json', data)
};
