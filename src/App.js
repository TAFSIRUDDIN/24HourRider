import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import allRiderData from './data/data.json';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import SetRide from './Components/SetRide/SetRide';
import SignIn from './Components/SignIn/SignIn';
import Navmenu from './Components/Navmenu/Navmenu';
import header from './Images/background.jpg'
import { Container } from 'react-bootstrap';
import { createContext, useEffect, useState } from 'react';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import NoMatch from './Components/NoMatch/NoMatch';

export const RiderContext = createContext();
export const UserContext = createContext();


function App() {
  const [ allRider, setAllRider ] = useState([]);
  useEffect(() => {
    setAllRider(allRiderData);
    
  },[])
  // console.log(allRider);


  const [user, setUser] = useState({
    
    name: '',
    email: '',
    password: '',
    photo: '',
    error: '',
    success: false
  })


  return (
    <RiderContext.Provider value={[ allRider, setAllRider ]}>
    <UserContext.Provider value={ [user, setUser] }>
    <Container fluid>
      
        <div style={{backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${header})`}}>
      
          <Router>
            <Navmenu></Navmenu>
              <Switch>
                <Route path="/home">
                  <Home/>
                </Route>
                <Route path="/login">
                  <Login/>
                </Route>
                <Route path="/signin">
                  <SignIn/>
                </Route>
                <PrivateRoute path="/setride/:riderId">
                  <SetRide/>
                </PrivateRoute>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="*">
                  <NoMatch/>
                </Route>
              </Switch>
          </Router>
    
        </div>
    
    </Container>
    </UserContext.Provider>
    </RiderContext.Provider>
    
  );
}

export default App;
