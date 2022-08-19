import React, { useState, Fragment } from "react"
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup';
import Collapse from 'react-bootstrap/Collapse';

function PrincipalCard(params) {
    const [open, setOpen] = useState(false);

    const now = new Date()

    let day = now.getDay()
    let hour = now.getHours()
    let minutes = now.getMinutes()

    if (hour < 10) {
        hour = '0' + hour
    }

    if (minutes < 10) {
        minutes = '0' + minutes
    }

    const dayName = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const actual = (main) => {
        let actualWeather = 'atmosfera'

        if ((main === 'Rain') || (actualWeather === 'Drizzle')) {
            actualWeather = 'chuva'
        } else if (main === 'Snow') {
            actualWeather = 'neve'
        } else if (main === 'Clouds') {
            actualWeather = 'nuvens'
        } else if (main === 'Clear') {
            actualWeather = 'sol'
        }

        return `weather_images/${actualWeather}.png`
    }

    return (
        <Fragment>
            <Card className='align-self-center mx-auto principal-card'>
                <Card.Body className='align-items-center'>
                    <p className="h1">Clima <img className="icon-cloud" src="favicon.ico" alt="nuvem" /></p>
                    <p> <img className="icon-actual" src={actual(params.main)} alt="actual" /> {capitalizeFirstLetter(params.description)}</p>
                    <p> <img className="icon-location" src="weather_images/location.png" alt="location" /> <span className="fw-semibold fst-italic">{params.cityName}</span></p>
                    <p> <img className="icon-clock" src="weather_images/clock.png" alt="clock" /> {hour}:{minutes}, {dayName[day]} </p>
                    <ListGroup className="list-info">
                        <ListGroup.Item>
                            <ListGroup>
                                <button
                                    onClick={() => setOpen(!open)}
                                    aria-controls="temps"
                                    aria-expanded={open}
                                >
                                    <img className="icon-location" src="weather_images/termometro.png" alt="temp"/> Temperatura atual: {params.actualTemp}° <img className="icon-location" src="weather_images/click.png" alt="click"/>
                                </button>
                                <Collapse in={open}>
                                    <div id="temps">
                                        <ListGroup.Item className="list-info2">Sensação Térmica: {params.sensationTemp}°</ListGroup.Item>
                                        <ListGroup.Item className="list-info2">Temperatura máxima: {params.maxTemp}°</ListGroup.Item>
                                        <ListGroup.Item className="list-info2">Temperatura mínima: {params.minTemp}°</ListGroup.Item>
                                    </div>
                                </Collapse>
                            </ListGroup>
                        </ListGroup.Item>
                        <ListGroup.Item><img className="icon-location" src="weather_images/pressao.png" alt="pressure" /> Pressão: {params.pressure} hpa</ListGroup.Item>
                        <ListGroup.Item><img className="icon-location" src="weather_images/umidade.png" alt="umidity" /> Umidade: {params.humidity}%</ListGroup.Item>
                        <ListGroup.Item><img className="icon-location" src="weather_images/vento.png" alt="wind" /> Velocidade do vento: {params.windVelocityKH} km/h</ListGroup.Item>
                    </ListGroup>
                    <p className="footer">Powered by <a target='_blank' rel="noreferrer" href="https://github.com/AdrielSantana"><span className="fw-semibold fst-italic">Adriel Santana</span></a></p>
                </Card.Body>
            </Card>
        </Fragment>
    )
}

export default PrincipalCard