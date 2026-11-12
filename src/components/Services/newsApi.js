import axios from 'axios';

export const fetchNews = async () => {
  try {
    const response = await axios.get(
      'https://api.apilayer.net/serpstack/search',
      {
        params: {
          access_key: 'f50414ba791ae9ca979f186a12db9840',
          query: 'cat',
        },
      }
    );
    console.log(response.data);
    
    return response.data;
  } catch (error) {
    console.error(error.response?.data || error.message);
    throw error;
  }
};
