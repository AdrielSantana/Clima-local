import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';

function App() {
  const [location, setLocation] = useState(false)
  const [weather, setWeather] = useState(false)

  let getWeather = async (lat, long) => {
    let res = await axios.get("https://pro.openweathermap.org/data/2.5/forecast", {
      params: {
        lat: lat,
        lon: long,
        appid: process.env.REACT_APP_OPEN_WEATHER_KEY,
        lang: 'pt',
        units: 'metric'
      }
    })
    setWeather(res.data)
    console.log(res.data)
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      getWeather(position.coords.latitude, position.coords.longitude)
      setLocation(true)
    })
  }, [])

  if (!location) {
    return (
      <Fragment>
        Permita a localização do navegador
      </Fragment>
    )
  } else if (weather === false) {
    return (
      <Fragment>
        Carregando o Clima...
      </Fragment>
    )
  } else {
    let windVelocityKH = weather['list'][0]['wind']['speed'] * 3.6

    return (
      <Fragment>
        <h3>Clima nas suas Coordenadas</h3>
        <h3>Cidade: {weather['city']['name']}</h3>
        <h3>Data da medição: {weather['list'][0]['dt_txt']}</h3>
        <h3>({weather['list'][0]['weather'][0]['description']})</h3>
        <hr />
        <ul>
          <li>Temperatura atual: {weather['list'][0]['main']['temp']}°</li>
          <li>Sensação Térmica: {weather['list'][0]['main']['feels_like']}°</li>
          <li>Temperatura máxima: {weather['list'][0]['main']['temp_max']}°</li>
          <li>Temperatura mínima: {weather['list'][0]['main']['temp_min']}°</li>
          <li>Pressão: {weather['list'][0]['main']['pressure']} hpa</li>
          <li>Umidade: {weather['list'][0]['main']['humidity']}%</li>
          <li>Velocidade do vento: {windVelocityKH} km/h</li>
        </ul>
      </Fragment>
    );
  }
}

export default App;
