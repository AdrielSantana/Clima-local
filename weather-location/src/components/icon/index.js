import React, { Fragment } from "react"
import './style.css'

function Icon(params) {
    const imgUrl = (icon) => {
        return `Clima-local/assets/weather_images/${icon}.png`
    }

    return (
        <Fragment>
            <img className="icon" src={imgUrl(params.icon)} alt={params.icon}/>
        </Fragment>
    )
}

export default Icon