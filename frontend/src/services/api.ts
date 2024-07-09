import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/api'; 

const api = axios.create({
  baseURL: API_URL,
});

export const registerUser = async (username: string, email: string, password: string) => {
  const response = await api.post('/register', { username, email, password });
  return response.data;
};

export const loginUser = async (email: string, password: string) => {
  const response = await api.post('/login', { email, password });
  return response.data;
};

export const getTweets = async () => {
  const response = await api.get('/tweets');
  return response.data;
};

export const createTweet = async (content: string, token: string) => {
  const response = await api.post('/tweets', { content }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};