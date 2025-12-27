import { forecastCardBg, defaultCardBg } from "../utils/backgrounds";

export default function Forecast({ data }) {
  return (
    <div className="forecast">
      {data.map((day, i) => {
        const bg = forecastCardBg[day.condition] || defaultCardBg;

        return (
          <div key={i} className="forecast-card" style={{ background: bg }}>
            <h3>{new Date(day.date).toDateString()}</h3>
            <p>⬇ {day.min} °C</p>
            <p>⬆ {day.max} °C</p>
            <p>{day.condition}</p>
          </div>
        );
      })}
    </div>
  );
}
