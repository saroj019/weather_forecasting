import axios from "axios";
import Search from "../models/Search.js";

export const getWeather = async (req, res) => {
  try {
    const city = req.params.city;
    const apiKey = process.env.WEATHER_API_KEY;

    if (!city) {
      return res.status(400).json({ message: "City is required" });
    }

    // 1️⃣ Fetch current weather
    const currentRes = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: { q: city, units: "metric", appid: apiKey }
      }
    );

    // 2️⃣ Fetch 5-day / 3-hour forecast
    const forecastRes = await axios.get(
      "https://api.openweathermap.org/data/2.5/forecast",
      {
        params: { q: city, units: "metric", appid: apiKey }
      }
    );

    const forecastList = forecastRes.data.list;

    // 3️⃣ Calculate next 24-hour min & max
    const now = new Date();
    const next24h = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    let min24h = Infinity;
    let max24h = -Infinity;

    forecastList.forEach(item => {
      const time = new Date(item.dt_txt);
      if (time >= now && time <= next24h) {
        min24h = Math.min(min24h, item.main.temp_min);
        max24h = Math.max(max24h, item.main.temp_max);
      }
    });

    // 4️⃣ Group forecast by date
    const daily = {};

    forecastList.forEach(item => {
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

    // 5️⃣ Build final forecast (today uses 24h values)
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

    // 6️⃣ Save search (optional)
    if (req.dbConnected) {
      Search.create({ city }).catch(() => {});
    }

    // 7️⃣ Send response
    res.json({
      current: {
        ...currentRes.data,
        min24h: Number(min24h.toFixed(1)),
        max24h: Number(max24h.toFixed(1))
      },
      forecast
    });
  } catch (error) {
    res.status(404).json({
      message: "City not found or weather service unavailable"
    });
  }
};
