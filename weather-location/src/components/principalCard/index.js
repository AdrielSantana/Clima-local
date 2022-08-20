import React, { useState, Fragment } from "react"
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup';
import Collapse from 'react-bootstrap/Collapse';
import Icon from '../icon'
import './style.css'

function PrincipalCard(params) {
    const [open, setOpen] = useState(false);

    const dayName = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const imgUrl = (main) => {
        
        let url = `Clima-local/assets/weather_images/cloud/${main}.png`

        if ((main === 'ensolarado') && (params.hour > 18 || params.hour < 5)){
            url = `Clima-local/assets/weather_images/cloud/noite.png`
        }
        return url
    }

    return (
        <Fragment>
            <Card className='align-self-center mx-auto principal-card'>
                <Card.Body className='align-items-center'>
                    <p className="h1">Clima <img className="icon-cloud" src="Clima-local/favicon.ico" alt="nuvem" /></p>
                    <p> <img className="icon-actual" src={imgUrl(params.main)} alt="actual" /> {capitalizeFirstLetter(params.description)}</p>
                    <p> <Icon icon={'location'}/> <span className="fw-semibold fst-italic">{params.cityName}</span></p>
                    <p> <img className="icon" src="Clima-local/assets/weather_images/clock.png" alt="clock" /> {params.hour}:{params.minutes}, {dayName[params.day]} </p>
                    <ListGroup className="list-info">
                        <ListGroup.Item>
                            <ListGroup>
                                <button
                                    onClick={() => setOpen(!open)}
                                    aria-controls="temps"
                                    aria-expanded={open}
                                >
                                    <Icon icon={'termometro'}/> Temperatura atual: {params.actualTemp}° <img className="icon" src="Clima-local/assets/weather_images/click.png" alt="click"/>
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
                        <ListGroup.Item><Icon icon={'pressao'}/> Pressão: {params.pressure} hpa</ListGroup.Item>
                        <ListGroup.Item><Icon icon={'umidade'}/> Umidade: {params.humidity}%</ListGroup.Item>
                        <ListGroup.Item><Icon icon={'vento'}/> Velocidade do vento: {params.windVelocityKH} km/h</ListGroup.Item>
                    </ListGroup>
                    <p className="footer">Powered by <a target='_blank' rel="noreferrer" href="https://github.com/AdrielSantana"><span className="fw-semibold fst-italic">Adriel Santana</span></a></p>
                </Card.Body>
            </Card>
        </Fragment>
    )
}

export default PrincipalCard