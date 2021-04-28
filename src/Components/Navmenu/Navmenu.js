import { faSign, faSignInAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';


const Navmenu = () => {
    const [user, setUser] = useContext(UserContext);
    // console.log(user)
    return (
        <Container>
            <Navbar bg="light" expand="lg">
            <Navbar.Brand><Link to="/home"><h1 style={{color: 'ORANGE'}}>24Hour ride</h1></Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link><Link to="/home">Home</Link></Nav.Link>
                <Nav.Link><Link to="/setride/:riderId">Destination</Link></Nav.Link>
                <Nav.Link><Link to="/">Blog</Link></Nav.Link>
                <Nav.Link><Link to="/">Contact</Link></Nav.Link>
                </Nav>
                <Form inline>
                {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" /> */}
                <h5 style={{marginRight: '15px'}}><FontAwesomeIcon icon={faUser} /> {user.name}</h5>
                <Link to="/login"><Button variant="outline-danger"> <FontAwesomeIcon icon={faSignInAlt} /> Login</Button></Link>
                </Form>
            </Navbar.Collapse>
            </Navbar>
        </Container>
    );
};

export default Navmenu;