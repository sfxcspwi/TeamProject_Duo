import axios from 'axios';

export const fetchNews = async () => {
  const response = await axios.get('https://newsdata.io/api/1/latest', {
    params: {
      apikey: 'pub_a0a5c5a2dca549a1993306cc1551a1a7',
      qInTitle:
        'animals OR wildlife OR pets OR dogs OR cats OR animal rescue OR endangered species',
      language: 'en',
      size: 10,
    },
  });

  return response.data.results || [];
};
