import axios from "axios";
import Search from "../models/Search.js";

/* US AQI calculation from PM2.5 */
const calculateAQI = (pm25) => {
  const breakpoints = [
    { cLow: 0.0, cHigh: 12.0, iLow: 0, iHigh: 50 },
    { cLow: 12.1, cHigh: 35.4, iLow: 51, iHigh: 100 },
    { cLow: 35.5, cHigh: 55.4, iLow: 101, iHigh: 150 },
    { cLow: 55.5, cHigh: 150.4, iLow: 151, iHigh: 200 },
    { cLow: 150.5, cHigh: 250.4, iLow: 201, iHigh: 300 },
    { cLow: 250.5, cHigh: 500.4, iLow: 301, iHigh: 500 }
  ];

  const bp = breakpoints.find(
    b => pm25 >= b.cLow && pm25 <= b.cHigh
  );

  if (!bp) return null;

  const aqi =
    ((bp.iHigh - bp.iLow) / (bp.cHigh - bp.cLow)) *
      (pm25 - bp.cLow) +
    bp.iLow;

  return Math.round(aqi);
};


export const getWeather = async (req, res) => {
  try {
    const city = req.params.city;
    const apiKey = process.env.WEATHER_API_KEY;

    if (!city) {
      return res.status(400).json({ message: "City is required" });
    }

    /* 1️⃣ Current Weather */
    const currentRes = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      { params: { q: city, units: "metric", appid: apiKey } }
    );

    const { lat, lon } = currentRes.data.coord;

    /* 2️⃣ Air Pollution (PM values) */
    const airRes = await axios.get(
      "https://api.openweathermap.org/data/2.5/air_pollution",
      { params: { lat, lon, appid: apiKey } }
    );

    const air = airRes.data.list[0].components;
    const pm25 = air.pm2_5;
    const pm10 = air.pm10;
    const aqi = calculateAQI(pm25);

    /* 3️⃣ Forecast (3-hour data) */
    const forecastRes = await axios.get(
      "https://api.openweathermap.org/data/2.5/forecast",
      { params: { q: city, units: "metric", appid: apiKey } }
    );

    const list = forecastRes.data.list;

    /* 4️⃣ Next 24-hour min/max temperature */
    const now = new Date();
    const next24h = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    let min24h = Infinity;
    let max24h = -Infinity;

    list.forEach(item => {
      const t = new Date(item.dt_txt);
      if (t >= now && t <= next24h) {
        min24h = Math.min(min24h, item.main.temp_min);
        max24h = Math.max(max24h, item.main.temp_max);
      }
    });

    /* 5️⃣ Group forecast by day */
    const daily = {};

    list.forEach(item => {
      const date = item.dt_txt.split(" ")[0];
      if (!daily[date]) {
        daily[date] = {
          date,
          min: item.main.temp_min,
          max: item.main.temp_max,
          condition: item.weather[0].main
        };
      } else {
        daily[date].min = Math.min(daily[date].min, item.main.temp_min);
        daily[date].max = Math.max(daily[date].max, item.main.temp_max);
      }
    });

    const today = new Date().toISOString().split("T")[0];

    const forecast = Object.values(daily)
      .slice(0, 5)
      .map(day =>
        day.date === today
          ? {
              date: day.date,
              min: Number(min24h.toFixed(1)),
              max: Number(max24h.toFixed(1)),
              condition: day.condition
            }
          : {
              date: day.date,
              min: Number(day.min.toFixed(1)),
              max: Number(day.max.toFixed(1)),
              condition: day.condition
            }
      );

    /* 6️⃣ Save search (optional DB) */
    if (req.dbConnected) {
      Search.create({
        city,
        temperature: currentRes.data.main.temp,
        aqi
      }).catch(() => {});
    }

    /* 7️⃣ Response */
    res.json({
      current: {
        ...currentRes.data,
        min24h: Number(min24h.toFixed(1)),
        max24h: Number(max24h.toFixed(1)),
        aqi,
        airQuality: { pm25, pm10 }
      },
      forecast
    });
  } catch {
    res.status(404).json({
      message: "City not found or service unavailable"
    });
  }
};
