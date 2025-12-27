import { weatherIcons, defaultIcon } from "../utils/weatherIcons";

export default function CurrentWeather({ data }) {
  const condition = data.weather[0].main;
  const icon = weatherIcons[condition] || defaultIcon;

  return (
    <div className="card">
      <h2>
        {icon} {data.name}
      </h2>

      <p>🌡 {data.main.temp} °C</p>

      <p>
        ⬇ {data.min24h} °C | ⬆ {data.max24h} °C
      </p>
      <p style={{ fontSize: "0.8rem", opacity: 0.7 }}>
        Next 24 hours
      </p>

      <p>🌫 AQI: {data.aqi}</p>
      <p style={{ fontSize: "0.8rem", opacity: 0.7 }}>
        PM2.5: {data.airQuality.pm25} µg/m³ | PM10: {data.airQuality.pm10} µg/m³
      </p>

      <p>{data.weather[0].description}</p>
    </div>
  );
}
