import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button, Col, Container, Jumbotron, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import './SetRide.css';
import riderData from '../../data/data.json'
import { faArrowsAltV, faMapMarkedAlt, faSearch, faSearchLocation, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import RideMap from '../RideMap/RideMap';


const SetRide = () => {
    const { riderId } = useParams();
    console.log(riderId);
    let selectedRider = riderData.find(rider => rider.id ==  riderId);
    console.log(selectedRider);

    const { image, name } = selectedRider;
    console.log(name);
    
    const [ride, setRide]  = useState(false);
    const [search, setSearch]  = useState(true);
    const searchRide = () => {
        setSearch(false);
        setRide(true);
    }
    const [ from, setFrom] = useState();
        const [ to, setTo] = useState();
        const [ date, setDate] = useState();
    const distination = (e) => {
        
        if (e.target.name === 'pickFrom') {
            const from = e.target.value;
            setFrom(from);
            console.log(from);
        }
        if (e.target.name === 'pickTo') {
            const to = e.target.value;
            setTo(to);
            console.log(to);
        }
        if (e.target.name === 'pickDate') {
            const date = e.target.value;
            setDate(date);
            console.log(date);
        }
        
    }
    return (
       <Container>
            <Jumbotron fluid>
                <Container>
                    <h1 style={{color: 'orange', textAlign: 'center'}}>Select a Rider</h1>
                </Container>
            </Jumbotron>
            <Row>
                <Col sm={4}>
                    <div className="search-box">
                    {search && <div>
                    <label for="pickFrom">Pick From</label>
                    <input type="text" onBlur={distination} id="pickFrom" name="pickFrom" placeholder="pick From"/>
                    
                    
                    <label for="pickTo">Pick To</label>
                    <input type="text" onBlur={distination} id="pickTo" name="pickTo" placeholder="pick To"/>
                    
                    
                    <label for="pickDate">Pick Date</label>
                    <input type="date" onBlur={distination} id="pickDate" name="pickDate"/>
                    </div>}
                    {ride && <div>
                        <div className="distination">
                        <p><FontAwesomeIcon icon={faMapMarkedAlt} /> {from}</p>
                        <FontAwesomeIcon icon={faArrowsAltV} color="blue" size="4x" />
                        <p><FontAwesomeIcon icon={faMapMarkedAlt} /> {to}</p>
                        <br/>
                        <p>Date : {date}</p>
                        </div>
                        <div className= "select-ride d-flex align-items-center justify-content-around">
                        <img src={image} alt="" />
                        <p>{name}</p>
                        <p><FontAwesomeIcon icon={faUserFriends} /> 4</p>
                        <p>$60</p>
                    </div>
                    <div className= "select-ride d-flex align-items-center justify-content-around">
                        <img src={image} alt="" />
                        <p>{name}</p>
                        <p><FontAwesomeIcon icon={faUserFriends} /> 3</p>
                        <p>$45</p>
                    </div>
                    <div className= "select-ride d-flex align-items-center justify-content-around">
                        <img src={image} alt="" />
                        <p>{name}</p>
                        <p><FontAwesomeIcon icon={faUserFriends} /> 6</p>
                        <p>$90</p>
                    </div>
                    </div> }

                    <Button onClick={searchRide} variant="primary"><FontAwesomeIcon icon={faSearchLocation} /> Search</Button>
                    </div>
                </Col>
                <Col sm={8}>
                    
                        <RideMap to={to}></RideMap>
                    
                </Col>
            </Row>
       </Container>
    );
};

export default SetRide;