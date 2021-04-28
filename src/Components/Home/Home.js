import React, { useContext } from 'react';
import Rideoption from '../Rideoption/Rideoption';
import {RiderContext} from '../../App';
import { Container, Jumbotron } from 'react-bootstrap';


const Home = () => {
    const [ allRider, setAllRider ] = useContext(RiderContext);
    // console.log(allRider);
    return (
        <div>
        <Jumbotron fluid>
            <Container>
                <h1 style={{color: 'orange', textAlign: 'center'}}>24Hour Ride</h1>
                <h4 style={{color: 'orange', textAlign: 'center'}}>
                    Select your ride
                </h4>
            </Container>
        </Jumbotron>
        <Rideoption allRider={allRider}></Rideoption>
        </div>
    );
};

export default Home;