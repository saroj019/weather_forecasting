import axios from "axios";

const API_URL = "http://localhost:5001";

export const fetchWeather = async (city) => {
  const res = await axios.get(`${API_URL}/api/weather/${city}`);
  return res.data;
};
