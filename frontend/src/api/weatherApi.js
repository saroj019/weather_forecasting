const API_URL = process.env.REACT_APP_API_URL;

export const fetchWeather = async (city) => {
  const res = await fetch(`${API_URL}/api/weather/${city}`);
  if (!res.ok) throw new Error("Failed to fetch weather");
  return res.json();
};
