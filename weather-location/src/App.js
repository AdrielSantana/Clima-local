import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';

import PrincipalCard from './components/principalCard';
import PreCard from './components/preCard';

import './App.css';

function App() {
  const [location, setLocation] = useState(false)
  const [weather, setWeather] = useState(false)
  const [forecast, setForecast] = useState(false)

  let getWeather = async (lat, long) => {
    let res = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat: lat,
        lon: long,
        appid: process.env.REACT_APP_OPEN_WEATHER_KEY,
        lang: 'pt',
        units: 'metric'
      }
    })
    setWeather(res.data)
  }

  let getForecast = async (lat, long) => {
    let res = await axios.get("https://api.openweathermap.org/data/2.5/forecast", {
      params: {
        lat: lat,
        lon: long,
        appid: process.env.REACT_APP_OPEN_WEATHER_KEY,
        lang: 'pt',
        units: 'metric'
      }
    })
    setForecast(res.data)
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      getWeather(position.coords.latitude, position.coords.longitude)
      getForecast(position.coords.latitude, position.coords.longitude)
      setLocation(true)
    })
  }, [])


  const whichTime = (actualWeather) => {
    let background = 'atmosfera'

    if ((actualWeather === 'Rain') || (actualWeather === 'Drizzle')) {
      background = 'chuvoso'
    } else if (actualWeather === 'Snow') {
      background = 'nevando'
    } else if (actualWeather === 'Clouds') {
      background = 'nublado'
    } else if (actualWeather === 'Clear') {
      background = 'ensolarado'
    }

    return background
  }

  const preBackgroud = (hour) => {
    let nightBoolean = (hour < 5 || hour > 18)
    let background = 'atmosfera'

    if (nightBoolean) {
      return 'noite/' + background
    } else {
      return 'dia/' + background
    }
  }

  const whichBackground = (hour, actualWeather) => {
    let nightBoolean = (hour < 5 || hour > 18)

    if (nightBoolean) {
      return 'noite/' + actualWeather
    } else {
      return 'dia/' + actualWeather
    }
  }

  const now = new Date()

  let date = now.getDate()
  let day = now.getDay()
  let hour = now.getHours()
  let minutes = now.getMinutes()

  if (hour < 10) {
    hour = '0' + hour
  }

  if (minutes < 10) {
    minutes = '0' + minutes
  }

  if (!location) {
    let text = 'Permita a localização no navegador'
    return (
      <Fragment>
        <Container fluid className='d-flex  background' style={{ backgroundImage: `url(/Clima-local/assets/background_images/${preBackgroud(hour)}.jpg)` }}>
          <PreCard
            text={text}
          />
        </Container>
      </Fragment>
    )
  } else if (!weather && !forecast) {
    return (
      <Fragment>
        <Container fluid className='d-flex justify-content-center  background' style={{ backgroundImage: `url(/Clima-local/assets/background_images/${preBackgroud(hour)}.jpg)` }}>
          <div className="loading lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        </Container>
      </Fragment>
    )
  } else {
    let cityName = weather['name']
    let description = weather['weather'][0]['description']
    let actualMain = weather['weather'][0]['main']

    let actualTemp = Math.round(weather['main']['temp'])
    let sensationTemp = Math.round(weather['main']['feels_like'])
    let maxTemp = Math.round(weather['main']['temp_max'])
    let minTemp = Math.round(weather['main']['temp_min'])
    let pressure = weather['main']['pressure']
    let humidity = weather['main']['humidity']
    let windVelocityKH = Math.round(weather['wind']['speed'] * 3.6)

    return (
      <Fragment>
        <Container fluid className='d-flex background' style={{ backgroundImage: `url(/Clima-local/assets/background_images/${whichBackground(hour, whichTime(actualMain))}.jpg)` }}>
          <PrincipalCard
            forecast={forecast}
            date={date}
            day={day}
            hour={hour}
            minutes={minutes}
            main={whichTime(actualMain)}
            cityName={cityName}
            description={description}
            actualTemp={actualTemp}
            sensationTemp={sensationTemp}
            maxTemp={maxTemp}
            minTemp={minTemp}
            pressure={pressure}
            humidity={humidity}
            windVelocityKH={windVelocityKH}
          />
        </Container>
      </Fragment>
    );
  }
}

export default App;
