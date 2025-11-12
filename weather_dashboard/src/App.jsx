import React, { useState, useEffect, useRef } from "react";
import './App.css'
export default function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  
  const intervalRef = useRef(null);

  const fetchWeather = async () => {
    setLoading(true);
    setError("");
    
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const res = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=22.7196&longitude=75.8577&current_weather=true"
      );
      if (!res.ok) {
        throw new Error("Failed to fetch weather");
      }
      const data = await res.json();
      const weatherData = {
        name: "Indore",
        description: "clear sky (demo)",
        temp: data.current_weather.temperature,
      };
      setWeather(weatherData);
      document.title = `${weatherData.temp}°C - ${weatherData.name}`;
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    
    fetchWeather();

    
    intervalRef.current = setInterval(() => {
      fetchWeather();
    }, 300000); 

    
    return () => clearInterval(intervalRef.current);
  }, []);

  console.log("weather", weather);

  return (
    <div>
      <h2>Weather Dashboard</h2>
      <button onClick={fetchWeather} disabled={loading}>
        {loading ? "Refreshing..." : "Refresh Now"}
      </button>

      {loading && (
        <div style={{ textAlign: "center" }}>
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather ? (
        <div>
          <h3>{weather.name}</h3>
          <p>{weather.description}</p>
          <p>Temperature: {weather.temp} °C</p>
        </div>
      ) : (
        !loading && <p>No weather data available</p>
      )}
    </div>
  );
}
