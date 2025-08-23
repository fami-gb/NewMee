'use client';
import { useState, useEffect } from 'react';
import { getAllWeathers } from '../../lib/weather';

const WeatherPage = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllWeatherData = async () => {
      setLoading(true);
      const data = await getAllWeathers();
      setWeatherData(data);
      setLoading(false);
    };
    fetchAllWeatherData();
  }, []);

  return (
    <div>
      <h2>🌈全国のお天気🌈</h2>
      <div className="weather-grid">
        {loading ? (
          <p className="loading-message">天気情報を読み込み中...</p>
        ) : (
          weatherData.map(weather => {
            let displayCityName = weather.city;
            if (weather.city === 'Shijōdōri') {
              displayCityName = '京都市';
            } else if (weather.city === 'Kami-nagarekawachō') {
              displayCityName = '広島市';
            } else if (weather.city === 'Yakuin-Horibata') {
              displayCityName = '福岡市';
            }

            return (
              weather && (
                <div key={weather.city} className="weather-card-item">
                  <div className="weather-card-header">
                    {/* 変更した都市名を表示する */}
                    <span className="weather-city">{displayCityName}</span>
                    <span className="weather-icon-large">{weather.icon}</span>
                  </div>
                  <div className="weather-temp-large">{weather.temp}°C</div>
                  <div className="weather-condition-text">{weather.condition}</div>
                  <div className="weather-details">
                    <div className="weather-detail-item">🌡️ 体感: {weather.feels_like}°C</div>
                    <div className="weather-detail-item">💧 湿度: {weather.humidity}%</div>
                    <div className="weather-detail-item">💨 風速: {weather.wind_speed}km/h</div>
                    <div className="weather-detail-item">📍 {displayCityName}</div>
                  </div>
                </div>
              )
            );
          })
        )}
      </div>
    </div>
  );
};

export default WeatherPage;
