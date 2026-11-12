import axios from 'axios';

const API_URL = 'https://newsdata.io/api/1/latest';

export const fetchNews = async () => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        apikey: 'pub_a0a5c5a2dca549a1993306cc1551a1a7',
        qInTitle: 'big dog',
        language: 'en',
      },
    });
    
    return response.data.results || [];
  } catch (error) {
    console.error('News API error:', error.response?.data || error.message);
    throw error;
  }
};
