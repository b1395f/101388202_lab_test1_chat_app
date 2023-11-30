import React, { useState, useEffect } from 'react';
import './Weather.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Weather = () => {
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [city, setCity] = useState("");

    const apiKey = '5c050bf196350a30d535cea176019f63';

    useEffect(() => {
        const fetchCurrentWeather = async () => {
        try {
            const response = await fetch(
            `http://api.openweathermap.org/data/2.5/weather?q=Toronto&appid=${apiKey}&units=metric`
            );

            if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setCurrentWeather(data);
        } catch (error) {
            console.error('Error fetching current weather data:', error);
        }
        };

        const fetchForecast = async () => {
        try {
            const response = await fetch(
            `http://api.openweathermap.org/data/2.5/forecast?q=Toronto&appid=${apiKey}&units=metric`
            );

            if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setForecastData(data);
        } catch (error) {
            console.error('Error fetching forecast data:', error);
        }
    };

    fetchCurrentWeather();
    fetchForecast();
  }, []);

  if (!currentWeather || !forecastData) {
    return <div>Loading...</div>;
  }

    const fetchWeather = async () => {
        try {
            const currentWeatherResponse = await fetch(
            `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        if (!currentWeatherResponse.ok) {
            throw new Error(`HTTP error! Status: ${currentWeatherResponse.status}`);
        }

        const currentWeatherData = await currentWeatherResponse.json();
        setCurrentWeather(currentWeatherData);

        const forecastResponse = await fetch(
            `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
        );

        if (!forecastResponse.ok) {
            throw new Error(`HTTP error! Status: ${forecastResponse.status}`);
        }

        const forecastData = await forecastResponse.json();
        setForecastData(forecastData);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchWeather();
        setCity(""); 
    };

    const groupForecastByDay = () => {
        const groupedForecast = {};
    
        forecastData.list.forEach((item) => {
        const date = item.dt_txt.split(' ')[0];
    
        if (date !== getCurrentDate()) {
            if (!groupedForecast[date]) {
            groupedForecast[date] = [];
            }
            groupedForecast[date].push(item);
        }
        });
    
        return groupedForecast;
    };

    const getCurrentDate = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        let month = currentDate.getMonth() + 1;
        month = month < 10 ? `0${month}` : month;
        let day = currentDate.getDate();
        day = day < 10 ? `0${day}` : day;
    
        return `${year}-${month}-${day}`;
    };

    const calculateMinMaxTemperature = (dailyForecast) => {
        const temperatures = dailyForecast.map((item) => item.main.temp);
        const minTemp = Math.min(...temperatures);
        const maxTemp = Math.max(...temperatures);
        return { minTemp, maxTemp };
    };

    const getWeatherIconUrl = (iconCode) => {
        const apiKey = '5c050bf196350a30d535cea176019f63';
        return `https://openweathermap.org/img/wn/${iconCode}.png`;
    };

    const formatDate = (dateString) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = new Date(dateString + ' UTC').toLocaleDateString('en-US', options);
        return formattedDate;
    };

    return (
        <div className="container mt-4">
          <h1 className="mb-4">Weather Forecast</h1>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Enter city name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
          <div className="row">
            <div className="col-md-6">
              <div className="card mb-4">
                <div className="card-body">
                  <h2 className="card-title">Current Weather</h2>
                  <p className="card-text temperature">
                    High: {Math.round(currentWeather?.main?.temp_max)}°C <br />
                    Low: {Math.round(currentWeather?.main?.temp_min)}°C <br />
                    Feels Like: {Math.round(currentWeather?.main?.feels_like)}°C <br />
                    Wind Speed: {currentWeather?.wind?.speed} m/s
                  </p>
                  <img
                    className="weather-icon"
                    src={getWeatherIconUrl(currentWeather?.weather[0]?.icon)}
                    alt={currentWeather?.weather[0]?.description}
                  />
                  <p className="card-text description">{currentWeather?.weather[0]?.description}</p>
                </div>
              </div>
            </div>
    
            <div className="col-md-6">
              <div className="card mb-4">
                <div className="card-body">
                  <h2 className="card-title">5 Day Weather Forecast</h2>
                  <div className="d-flex overflow-auto">
                    {Object.entries(groupForecastByDay()).map(([date, dailyForecast], index) => {
                      const { minTemp, maxTemp } = calculateMinMaxTemperature(dailyForecast);
                      const formattedDate = formatDate(date);
    
                      return (
                        <div key={index} className="forecast-item">
                          <p className="card-text date">{formattedDate}</p>
                          <img
                            className="weather-icon"
                            src={getWeatherIconUrl(dailyForecast[0]?.weather[0]?.icon)}
                            alt={dailyForecast[0]?.weather[0]?.description}
                          />
                          <p className="temperature-info">
                            High: {Math.round(maxTemp)}°C <br />
                            Low: {Math.round(minTemp)}°C
                          </p>
                          <p className="card-text description">{dailyForecast[0]?.weather[0]?.description}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
    </div>
    );
};

export default Weather;