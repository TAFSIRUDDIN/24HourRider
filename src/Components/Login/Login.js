import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle} from '@fortawesome/free-brands-svg-icons';
import firebase from "firebase/app";
import "firebase/auth";
import { Container } from 'react-bootstrap';
import './Login.css';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';


const Login = () => {
    const [user, setUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    console.log(user)
    const handleBlur = (e) => {
        let isFieldValid = true;
          // console.log(e.target.name, e.target.value);
          if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
            
          }
          if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber;
          }
          if (isFieldValid) {
            const newUserInfo = {...user};
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
            
          }
      }
      const handleSubmit = (e) => {
        if (user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then((userCredential) => {
              const newUserInfo = {...user};
              newUserInfo.error = '';
              newUserInfo.success = true
              setUser(newUserInfo);
              history.replace(from);
            })
            .catch((error) => {
              console.log(error.message);
              const newUserInfo = {...user};
              newUserInfo.error = error.message;
              newUserInfo.success = false;
              setUser(newUserInfo);
            });
        }
      e.preventDefault();
      }
      console.log(user);
      // handle fb sign in and
      const handleFacebookLogIn = () => {
        var fbProvider = new firebase.auth.FacebookAuthProvider();
        firebase
          .auth()
          .signInWithPopup(fbProvider)
          .then((result) => {
            const {displayName, email} = result.user;
            const signedInUser = {name: displayName, email};
            setUser(signedInUser);
            history.replace(from);
          })
          .catch((error) => {
            
            // var errorCode = error.code;
            // var errorMessage = error.message;
            
            // var email = error.email;
            
            // var credential = error.credential;

            
          });
      }
      
      // handle google sign in
      const handleGoogleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            const {displayName, email} = result.user;
            const signedInUser = {name: displayName, email};
            setUser(signedInUser);
            history.replace(from);
            
        }).catch((error) => {
          
            // var errorCode = error.code;
            // var errorMessage = error.message;

        });
    }
    return (
        <Container fluid>
        <>
            <div className="login-form">
                <h3>Login</h3>
                <form onSubmit={handleSubmit}> 
                <label for="email">Name</label>
                <input type="text" id="email" onBlur={handleBlur} name="email" placeholder="email.."/>

                <label for="password">password</label>
                <input type="password" id="password" onBlur={handleBlur} name="password" placeholder="password"/>
            
                <input type="submit" value="Login"/>
            </form>
            <p style={{color: 'red'}}>{user.error}</p>
                {user.success && <p style={{color: 'green'}}>user loggedin successfully</p>}
            <h5>Don't have an account? <Link to="/signin">Create an account</Link> </h5>
            </div> 
            <h4 className="or">Or</h4>
            <button onClick={handleFacebookLogIn} className="google-logIn d-flex align-items-center justify-content-around">
            <div><FontAwesomeIcon icon={faFacebook} color="blue" size="3x" /></div><h5>continue with facebook</h5>
            </button>
            <button onClick={handleGoogleSignIn} className="google-logIn d-flex align-items-center justify-content-around">
            <div><FontAwesomeIcon icon={faGoogle} color="red" size="3x" /></div><h4>continue with google</h4>
            </button>
        </>
        </Container>
    );
};

export default Login;