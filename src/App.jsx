import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import defaultImage from './images/cloudy.jpg'; 
import clearImage from './images/clear.jpg';
import cloudsImage from './images/cloudy.jpg';
import rainImage from './images/rainy.jpg';
import snowImage from './images/snowy.jpg';
import hazeImage from './images/haze.jpg'; 
import DateTime from './dateTime';



const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [backgroundImage, setBackgroundImage] = useState(defaultImage);

  const apiKey = '4159bc0805c30dfdb492b558f069eaf4'; 
  
  const dummyWeather = {
    name: 'Kerala',
    weather: [{ description: 'clouds', icon: '04d' }],
    main: { temp: 25, humidity: 80 },
    wind: { speed: 5 },
    visibility: 10000,
  };

  
  useEffect(() => {
    setWeather(dummyWeather);
    updateBackground(dummyWeather);
  }, []);

  
  
  const updateBackground = (weatherData) => {
    const condition = weatherData.weather[0].description.toLowerCase();
    let newBackgroundImage = defaultImage; 

    if (condition.includes('clear')) {
      newBackgroundImage = clearImage;
    } else if (condition.includes('cloud')) {
      newBackgroundImage = cloudsImage;
    } else if (condition.includes('rain')) {
      newBackgroundImage = rainImage;
    } else if (condition.includes('snow')) {
      newBackgroundImage = snowImage;
    } else if (condition.includes('haze')) {
      newBackgroundImage = hazeImage;
    }

    setBackgroundImage(newBackgroundImage);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeather(response.data);
      updateBackground(response.data);
      setError('');
    } catch (err) {
      const errorMessage = 'City not found. Please try again.';
      setError(errorMessage);
      alert(errorMessage);
    }
  };

  return (
    <div style={{ textAlign: 'center', color: 'white', backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', height: '100vh' }}>
      <div className="grid-container">
        <div className="box box1"></div>

        <div className="box box2">
          {weather && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'end', marginTop: '20px' }}>
              <p style={{ fontSize: '60px', marginRight: '10px', textTransform: 'uppercase' }}>
                {weather.weather[0].description}
              </p>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="weather icon"
                style={{ width: '110px', height: '110px' }}
              />
            </div>
          )}
        </div>

        <div className="box box3" id="last-col">
          <div>
            <h1 style={{ marginTop: '40px', fontSize: '60px' }}>Weather App</h1>
            <div className="row justify-content-end" style={{ marginTop: '80px' }}>
              <div className="col-6">
                <input
                  type="text"
                  id="search-box"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter city name"
                  className="form-control w-100"
                />
              </div>
              <div className="col-2 justify-content-start">
                <button onClick={handleSearch} id="search-btn" className="btn btn-light">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
              <div className="col-2"></div>
            </div>

            {weather && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}>
                <h1 style={{ fontSize: '50px', marginRight: '10px' }}>{weather.name}</h1>
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt="weather icon"
                  style={{ width: '110px', height: '110px' }}
                />
              </div>
            )}

            <hr style={{ width: '80%', marginLeft: '40px' }} />

            {weather && <p style={{ fontSize: '30px' }}>Temperature: {weather.main.temp}°C</p>}

            <hr style={{ width: '80%', marginLeft: '40px' }} />

            {weather && <p style={{ fontSize: '30px' }}>Humidity: {weather.main.humidity}%</p>}

            <hr style={{ width: '80%', marginLeft: '40px' }} />

            {weather && <p style={{ fontSize: '30px' }}>Wind Speed: {weather.wind.speed} m/s</p>}

            <hr style={{ width: '80%', marginLeft: '40px' }} />

            {weather && <p style={{ fontSize: '30px' }}>Visibility: {weather.visibility / 1000} km</p>}

            <hr style={{ width: '80%', marginLeft: '40px' }} />
          </div>
        </div>

        <div className="box box4">
          <DateTime/>
        </div>

        <div className="box box5">
          {weather && (
            <p style={{ fontSize: '110px', top: '42rem', left: '52rem', position: 'fixed' }}>
              {weather.main.temp}°C
            </p>
          )}
        </div>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default App;
