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

export const createTweet = async (tweetText: string, token: string) => {
  try {
    const response = await fetch('/api/tweets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content: tweetText }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Server response:', result);
      throw new Error(result.error || 'Failed to create tweet');
    }

    return result;
  } catch (error) {
    console.error('Error creating tweet:', error);
    throw error;
  }
};
