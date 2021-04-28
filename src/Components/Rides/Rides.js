import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Rides = (props) => {
    // console.log(props.ride)
    const {image, name, id} = props.ride;
    return (
    <Card >
        <Card.Img variant="top" src={image} />
        <Card.Body>
        {/* <Card.Title>Card title</Card.Title> */}
        <Card.Text>
            Ride With {name}
        </Card.Text>
        </Card.Body>
        <Card.Footer>
        <Link to={`/setride/${id}`}><Button variant="primary">Get Ride <FontAwesomeIcon icon={faArrowRight} /></Button></Link>
        
        </Card.Footer>
    </Card>
    );
};

export default Rides;