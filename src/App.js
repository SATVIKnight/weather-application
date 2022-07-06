import React, {useState} from 'react';
import Clock from './components/Clock.js';
const api = {
  key: "dd4d92317572ff449ea202ae0342bacb",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
 
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
      }
    }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 20) ? 'App warm' : 'App') : 'Default'}>
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search here"
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        <div className='wrapper'><Clock/></div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°c
            </div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
        ) : ('')}
      </main> 
    </div>
  );
}

export default App;
