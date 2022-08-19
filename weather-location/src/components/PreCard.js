import React, { Fragment } from "react"
import Card from 'react-bootstrap/Card'

function PreCard(params) {
    return (
        <Fragment>
            <Card className='align-self-center mx-auto message-card'>
                <Card.Body className='d-flex align-items-center'>
                    {params.loading}
                    <p className='fs-1 text-center'>{params.text}</p>
                </Card.Body>
            </Card>
        </Fragment>
    )
}

export default PreCard