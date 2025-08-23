// src/app/page.js の変更点
'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import { getWeatherByCoords, getWeatherByCity } from '../lib/weather';

export default function Home() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = () => {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const data = await getWeatherByCoords(latitude, longitude);
          if (data) {
            setWeather(data);
          } else {
            throw new Error();
          }
        } catch (e) {
          setError('天気情報の取得に失敗しました。');
        }
      }, async (err) => {
        console.warn(`Geolocation Error: ${err.message}`);
        setError('位置情報が取得できませんでした。東京の天気を表示します。');
        try {
          const data = await getWeatherByCity('東京');
          setWeather(data);
        } catch (e) {
          setError('東京の天気情報の取得にも失敗しました。');
        }
      });
    };

    fetchWeatherData();
  }, []);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h2>💫今日のコーデ💫</h2>
        <div className="card weather-widget" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', textAlign: 'center', minHeight: '96px', width: '100%' }}>
          {!weather && !error && <div>現在地の天気を読み込み中...</div>}
          {error && !weather && <div>{error}</div>}
          {weather && (
            <>
              <div>
                <div className="location">{weather.city}</div>
                <div className="condition" style={{ fontSize: '16px', color: '#666' }}>{weather.condition}</div>
              </div>
              <div>
                <div className="temp" style={{ fontSize: '48px', fontWeight: 'bold', color: 'var(--primary-color)' }}>
                  {weather.temp}<span style={{ fontSize: '24px' }}>°C</span>
                </div>
              </div>
              <div>
                <div>最高: {weather.temp_max}°C</div>
                <div>最低: {weather.temp_min}°C</div>
              </div>
            </>
          )}
        </div>
        <div className="card recommendation">
          <h3>✨今日のおすすめコーデ✨</h3>
          <div className="rec-image" style={{ 
            width: '100%',
            height: '250px',
            backgroundColor: '#eee',
            borderRadius: '8px',
            marginBottom: '15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#aaa',
            fontSize: '18px'
          }}>
            ここに画像
          </div>
          <p><strong>今日の予定:</strong> 友人とのランチ</p>
          <p>今日は日差しが強いので、涼しいリネンのシャツに、動きやすいチノパンを合わせるのがおすすめです。足元はサンダルで軽快に！</p>
        </div>
      </main>
    </div>
  );
}
