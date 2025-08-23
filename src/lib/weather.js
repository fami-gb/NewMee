const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

const cityCoordinates = {
    '札幌': { lat: 43.06, lon: 141.35 },
    '仙台': { lat: 38.26, lon: 140.87 },
    '東京': { lat: 35.68, lon: 139.69 },
    '横浜': { lat: 35.44, lon: 139.64 },
    '名古屋': { lat: 35.18, lon: 136.90 },
    '京都': { lat: 35.010329, lon: 135.768848 },
    '大阪': { lat: 34.69, lon: 135.50 },
    '神戸': { lat: 34.69, lon: 135.19 },
    '広島': { lat: 34.39, lon: 132.45 },
    '福岡': { lat: 33.59, lon: 130.40 },
    '沖縄': { lat: 26.21, lon: 127.68 },
};

const weatherIconMap = {
    '01d': '☀️', '01n': '🌙',
    '02d': '🌤️', '02n': '☁️',
    '03d': '☁️', '03n': '☁️',
    '04d': '☁️', '04n': '☁️',
    '09d': '🌧️', '09n': '🌧️',
    '10d': '🌦️', '10n': '🌧️',
    '11d': '⛈️', '11n': '⛈️',
    '13d': '❄️', '13n': '❄️',
    '50d': '🌫️', '50n': '🌫️',
};


const fetchWeather = async (lat, lon) => {
    console.log("Using API Key:", API_KEY ? "Key Found" : "Key Not Found!");
    try {
        const response = await fetch(`${API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=ja`);
        if (!response.ok) {
            console.error("Fetch response not OK:", response);
            throw new Error(`Weather data fetch failed with status: ${response.status}`);
        }
        const data = await response.json();
        return {
            city: data.name,
            temp: Math.round(data.main.temp),
            temp_min: Math.round(data.main.temp_min), // 最低気温を追加
            temp_max: Math.round(data.main.temp_max), // 最高気温を追加
            condition: data.weather[0].description,
            icon: weatherIconMap[data.weather[0].icon] || '❓',
            feels_like: Math.round(data.main.feels_like),
            humidity: data.main.humidity,
            wind_speed: Math.round(data.wind.speed * 3.6), // m/s to km/h
        };
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return null;
    }
};

export const getWeatherByCity = async (city) => {
    const coords = cityCoordinates[city];
    if (!coords) {
        console.error(`Coordinates not found for city: ${city}`);
        return null;
    }
    return fetchWeather(coords.lat, coords.lon);
};

export const getWeatherByCoords = async (lat, lon) => {
    return fetchWeather(lat, lon);
};

export const getAllWeathers = async () => {
    const promises = Object.keys(cityCoordinates).map(city => getWeatherByCity(city));
    const results = await Promise.all(promises);
    return results.filter(r => r !== null);
}
