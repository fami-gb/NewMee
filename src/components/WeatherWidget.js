'use client';

import { useEffect, useState } from 'react';
import LocationModal from './LocationModal';
import { getWeatherByCity, getWeatherByCoords } from '../lib/weather';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState('東京');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchWeatherData = async (loc) => {
    setWeather(null); // Reset weather while fetching
    let data;
    if (loc === '現在地') {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        data = await getWeatherByCoords(latitude, longitude);
        if (data) {
          setWeather(data);
          setLocation(data.city);
        }
      }, async (error) => {
        console.error("Geolocation error:", error);
        // If user denies location, default to Tokyo
        data = await getWeatherByCity('東京');
        setWeather(data);
        setLocation('東京');
      });
    } else {
      data = await getWeatherByCity(loc);
      setWeather(data);
      setLocation(loc);
    }
  };

  useEffect(() => {
    // Fetch weather for current location on initial load
    fetchWeatherData('現在地');
  }, []);

  const handleSelectLocation = (newLocation) => {
    fetchWeatherData(newLocation);
  };

  return (
    <>
      <div className="sidebar-weather">
        <div className="weather-location">📍 {location}</div>
        {weather ? (
          <>
            <div className="weather-temp">{weather.temp}°C</div>
            <div className="weather-desc">{weather.condition}</div>
          </>
        ) : (
          <div className="weather-desc">読み込み中...</div>
        )}
        <div onClick={() => setIsModalOpen(true)} className="weather-change-btn">📍 地点変更</div>
      </div>
      <LocationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectLocation={handleSelectLocation}
      />
    </>
  );
};

export default WeatherWidget;
