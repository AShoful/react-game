import axios from '../axios';

export default {
  get: () => axios.get('/options.json'),
  getWinners: () => axios.get('/winners.json'),
  post: (data) => axios.post('/winners.json', data)
};
