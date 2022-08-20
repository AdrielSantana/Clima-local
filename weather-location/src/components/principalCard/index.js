import React, { useState, Fragment } from "react"
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup';
import Collapse from 'react-bootstrap/Collapse';
import Icon from '../icon'
import Forecast from "../forecast";
import Container from 'react-bootstrap/Container'
import './style.css'

function PrincipalCard(params) {
    const [open, setOpen] = useState(false);

    const forecasts = params.forecast['list']

    const addForecast = (forecasts, hourNow) => {
        let fiveForecasts = []
        for (let index = 0; index < forecasts.length; index++) {
            let forecast = forecasts[index];
            let date = forecast['dt_txt'].slice(8, 10)
            let hour = forecast['dt_txt'].slice(11, 13)
            let intHour = parseInt(hourNow)
            // eslint-disable-next-line
            if ((intHour % 3) != 0) {
                let resto = intHour % 3
                intHour = intHour + (3 - resto)
            } else if (intHour < 3) {
                intHour = 3
            }
            hourNow = parseFloat(intHour)
            if (intHour < 10) {
                hourNow = '0' + hourNow
            }
            // eslint-disable-next-line
            if (date == params.date || hour != hourNow) {
                continue
            }
            fiveForecasts.push(forecast)
        }
        return fiveForecasts
    }

    const dayName = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const imgUrl = (main) => {

        let url = `/Clima-local/assets/weather_images/cloud/${main}.png`

        if ((main === 'ensolarado') && (params.hour > 18 || params.hour < 5)) {
            url = `/Clima-local/assets/weather_images/cloud/noite.png`
        }
        return url
    }

    let fiveForecasts = []

    if (forecasts != null) {
        fiveForecasts = addForecast(forecasts, params.hour)
    }

    return (
        <Fragment>
            <Card className='align-self-center mx-auto principal-card'>
                <Card.Body className='align-items-center'>
                    <p className="h1">Clima <img className="icon-cloud" src="/Clima-local/favicon.ico" alt="nuvem" /></p>
                    <p> <img className="icon-actual" src={imgUrl(params.main)} alt="actual" /> {capitalizeFirstLetter(params.description)}</p>
                    <p> <Icon icon={'location'} /> <span className="fw-semibold fst-italic">{params.cityName}</span></p>
                    <p> <img className="icon" src="/Clima-local/assets/weather_images/clock.png" alt="clock" /> {params.hour}:{params.minutes}, {dayName[params.day]} </p>
                    <ListGroup className="list-info">
                        <ListGroup.Item>
                            <ListGroup>
                                <button
                                    onClick={() => setOpen(!open)}
                                    aria-controls="temps"
                                    aria-expanded={open}
                                >
                                    <Icon icon={'termometro'} /> Temperatura atual: {params.actualTemp}° <img className="icon" src="/Clima-local/assets/weather_images/click.png" alt="click" />
                                </button>
                                <Collapse in={open}>
                                    <div id="temps">
                                        <ListGroup.Item className="list-info2">Temperatura máxima: {params.maxTemp}°</ListGroup.Item>
                                        <ListGroup.Item className="list-info2">Temperatura mínima: {params.minTemp}°</ListGroup.Item>
                                        <ListGroup.Item className="list-info2">Sensação Térmica: {params.sensationTemp}°</ListGroup.Item>
                                    </div>
                                </Collapse>
                            </ListGroup>
                        </ListGroup.Item>
                        <ListGroup.Item><Icon icon={'pressao'} /> Pressão: {params.pressure} hpa</ListGroup.Item>
                        <ListGroup.Item><Icon icon={'umidade'} /> Umidade: {params.humidity}%</ListGroup.Item>
                        <ListGroup.Item><Icon icon={'vento'} /> Velocidade do vento: {params.windVelocityKH} km/h</ListGroup.Item>
                    </ListGroup>
                    <Container className="justify-content-evenly d-flex">
                        {fiveForecasts.map((forecast, index) => {
                            console.log(fiveForecasts)
                            let description = forecast['weather'][0]['description']
                            let icon = forecast['weather'][0]['main']
                            let actualTemp = Math.round(forecast['main']['temp'])
                            let sensationTemp = Math.round(forecast['main']['feels_like'])
                            let maxTemp = Math.round(forecast['main']['temp_max'])
                            let minTemp = Math.round(forecast['main']['temp_min'])
                            let pressure = forecast['main']['pressure']
                            let humidity = forecast['main']['humidity']
                            let windVelocityKH = Math.round(forecast['wind']['speed'] * 3.6)

                            return <Forecast
                                id={index + 1}
                                description={description}
                                day={params.day}
                                icon={icon}
                                actualTemp={actualTemp}
                                sensationTemp={sensationTemp}
                                maxTemp={maxTemp}
                                minTemp={minTemp}
                                pressure={pressure}
                                humidity={humidity}
                                windVelocityKH={windVelocityKH}
                                key={index}
                            />
                        })}
                    </Container>
                    <p className="footer">Powered by <a target='_blank' rel="noreferrer" href="https://github.com/AdrielSantana"><span className="fw-semibold fst-italic">Adriel Santana</span></a></p>
                </Card.Body>
            </Card>
        </Fragment>
    )
}

export default PrincipalCard