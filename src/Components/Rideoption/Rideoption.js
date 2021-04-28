
import {  CardDeck } from 'react-bootstrap';
import Rides from '../Rides/Rides';

const RideOption = (props) => {
    const rideOptions = props.allRider;

    // console.log(rideOptions);
    return (
        <div style={{paddingTop: '100px', paddingBottom: '100px'}}>
        
            <CardDeck>
            {
                rideOptions.map(ride => <Rides key={ride.id} ride={ride}></Rides>)
            }
            
            </CardDeck>
       
        </div>
    );
};

export default RideOption;