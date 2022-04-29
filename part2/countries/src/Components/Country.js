import { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const Country = ({countryData: {name, flag, capital, area, languages}}) => {
    const [ weather, setWeather ] = useState({})
    const [ location, setLocation ] = useState({})

    useEffect(() => {
        axios
            .get(`http://api.openweathermap.org/geo/1.0/direct?q=${capital[0]}&limit=1&appid=${api_key}`)
            .then( response => {
                setLocation(response.data[0]) 
            })
            .catch( (error) => {
                console.log(error)
            })
    }, [capital])

    useEffect(() => {
        if (location && "lat" in location) {
            axios
                .get(`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${api_key}`)
                .then( (response) => {
                    setWeather(response.data) 
                })
                .catch( (error) => {
                    console.log(error)
                })
        }
    }, [location])

    return (
      <>
        <h1>{name.common} {flag}</h1>
        <div>
          <h3>Basic Info</h3>
          Capital: { capital.length > 1 ? capital.join(" / ") : capital }
          <br />
          Area: {area} km<sup>2</sup>
        </div>
        <div>
          <h3>Languages</h3>
          <ul>
            {
              Object.values(languages).map( language => (
                <li key={language}>{language}</li> 
                ))
            }
          </ul>
        </div>
        {"main" in weather && (
            <div>
                <h3>Current Weather in {capital[0]}</h3>
                Temperature: { weather.main.temp }°C (feels like { weather.main.feels_like }°C)<br />
                Humidity: { weather.main.humidity }%<br />
                Conditions: { weather.weather[0].main }
                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt={weather.weather[0].description} /><br />
                Wind: { weather.wind.speed } km/h at {weather.wind.deg}°
            </div>
        )}
      </>
        
    )  
  }

  export default Country