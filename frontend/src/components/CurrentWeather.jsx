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

      {/* 24-hour min & max */}
      <p>
        ⬇ {data.min24h} °C | ⬆ {data.max24h} °C
      </p>
      <p style={{ fontSize: "0.9rem", opacity: 0.7 }}>
        Next 24 hours
      </p>

      <p>{data.weather[0].description}</p>
    </div>
  );
}
