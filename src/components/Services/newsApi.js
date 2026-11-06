import axios from "axios";
export const fetchNews= async() => {
    const response =await axios.get(
      'https://newsapi.org/v2/everything?q=cat&apiKey=6a260b55a1e2462491c77881e0776095'
    );
    return response.data;
}