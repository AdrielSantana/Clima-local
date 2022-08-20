import React, { useState, Fragment } from "react"
import Modal from 'react-bootstrap/Modal'
import ListGroup from 'react-bootstrap/ListGroup';
import Collapse from 'react-bootstrap/Collapse';
import Icon from '../icon'
import './style.css'

function Forecast(params) {
    let forecastDay = params.day + params.id

    if (forecastDay > 6) {
        forecastDay = forecastDay - 7
    }

    const dayName = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]

    function MyVerticallyCenteredModal(props) {
        const [open, setOpen] = useState(false);

        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        return (
            <Modal
                {...props}
                size="sm"
                aria-labelledby={params.id}
                centered
            >
                <Modal.Header closeButton closeVariant='white'>
                    <p className="fs-3 fw-light fst-italic">{dayName[forecastDay]}</p>
                </Modal.Header>
                <Modal.Body>
                    <p><img className="icon-forecast-modal" src={imgUrl(params.icon)} alt={params.icon} /> {capitalizeFirstLetter(params.description)}</p>
                    <ListGroup className="list-info">
                        <ListGroup.Item>
                            <ListGroup>
                                <button
                                    onClick={() => setOpen(!open)}
                                    aria-controls="temps"
                                    aria-expanded={open}
                                >
                                    <Icon icon={'termometro'} /> Temperatura: {params.actualTemp}°<img className="icon" src="/Clima-local/assets/weather_images/click.png" alt="click" />
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
                </Modal.Body>
            </Modal>
        );
    }

    const [modalShow, setModalShow] = useState(false);

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

    const imgUrl = (icon) => {
        return `/Clima-local/assets/weather_images/cloud/${whichTime(icon)}.png`
    }

    const forecastIconDay = (day) => {
        let date = day.slice(0, 3)
        return date
    }

    return (
        <Fragment>
            <div>
                <MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
                <button onClick={() => setModalShow(true)}>
                    <img className="icon-forecast" src={imgUrl(params.icon)} alt={params.icon} />
                </button>
                <br />
                <p className="forecast-date fw-light">
                    {forecastIconDay(dayName[forecastDay])}
                </p>
            </div>
        </Fragment>
    )
}

export default Forecast