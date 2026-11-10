import axios from "axios";
export const fetchNews = async () => {
    const response =await axios.get(
      "https://newsdata.io/api/1/latest?apikey=pub_a0a5c5a2dca549a1993306cc1551a1a7&q=animals"
  );
  
    return response.data.results;
}