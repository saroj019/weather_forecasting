import { useState } from "react";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import Loader from "./components/Loader";
import { fetchWeather } from "./api/weatherApi";
import { weatherBg, defaultBg } from "./utils/backgrounds";
import "./index.css";

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (city) => {
    if (!city) return;
    try {
      setLoading(true);
      setError("");
      const data = await fetchWeather(city);
      setWeather(data);
    } catch {
      setError("City not found");
    } finally {
      setLoading(false);
    }
  };

  // ✅ ADD THESE TWO LINES HERE
  const condition = weather?.current?.weather?.[0]?.main;
  const bgColor = weatherBg[condition] || defaultBg;

  return (
    // ✅ USE bgColor HERE
    <div className="app-wrapper" style={{ background: bgColor }}>
      <div className="app">
        <h1>🌤 Weather Dashboard</h1>

        <SearchBar onSearch={handleSearch} />

        {loading && <Loader />}
        {error && <p className="error">{error}</p>}

        {weather && (
          <>
            <CurrentWeather data={weather.current} />
            <Forecast data={weather.forecast} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
