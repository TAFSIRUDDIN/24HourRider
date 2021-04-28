import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle} from '@fortawesome/free-brands-svg-icons';
import firebase from "firebase/app";
import "firebase/auth";
import './SignIn.css';
import { useState } from 'react';
import firebaseConfig from "../firebase.config";
import { Container } from "react-bootstrap";
import { Link } from 'react-router-dom';
if (firebase.apps.length === 0) { 
  firebase.initializeApp(firebaseConfig);
}
const SignIn = () => {
//   const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    
    name: '',
    email: '',
    password: '',
    photo: '',
    error: '',
    success: false
  })
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
  // console.log(user);
  const handleSubmit = (e) => {

    if (user.email && user.password) {
      console.log('submitting');
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then((userCredential) => {
        // Signed in 
        const newUserInfo = {...user};
        newUserInfo.error = '';
        newUserInfo.success = true
        setUser(newUserInfo);
        updateUserInfo(user.name);
        console.log(userCredential.user);
       
        // ...
      })
      .catch((error) => {
        const newUserInfo = {...user};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        setUser(newUserInfo);
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // console.log(errorCode, errorMessage);
      });
    }
    
    e.preventDefault();
  }
  const updateUserInfo = name => {
        const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name,
    }).then(function() {
      console.log('username updated successfully')
    }).catch(function(error) {
      // An error happened.
    });
  }


  //handle google sign in and

  
  return (
    <Container fluid>
        <>
            <div className="signIn-form">
                <h3>Create a new account</h3>
                <form onSubmit={handleSubmit}>     
                     <label for="name">Name</label>
                    <input type="text" onBlur={handleBlur} id="name" name="name" placeholder="Name.."/>

                    <label for="email">Email</label>
                    <input type="text" id="userNameOrEmail" onBlur={handleBlur} name="email" placeholder="User Name Or Email"/>

                    <label for="password">password</label>
                    <input type="password" id="password" onBlur={handleBlur} name="password" placeholder="password"/>

                    <label for="ConfirmPassword">Confirm Password</label>
                    <input type="ConfirmPassword" id="ConfirmPassword" name="ConfirmPassword" placeholder="ConfirmPassword"/>

                    <input type="submit" value='sign up'/>
                </form>
                <p style={{color: 'red'}}>{user.error}</p>
                {user.success && <p style={{color: 'green'}}>user created successfully</p>}
                <h5>Already have an account? <Link to="/login">Login</Link></h5>
            </div>
            <h4 className="or">Or</h4>
            <Link to="/login">
            <button className="google-signIn d-flex align-items-center justify-content-around">
            <div><FontAwesomeIcon icon={faFacebook} color="blue" size="3x" /></div><h5>continue with facebook</h5>
            </button>
            </Link>
            <Link to="/login">
            <button className="google-signIn d-flex align-items-center justify-content-around">
            <div><FontAwesomeIcon icon={faGoogle} color="red" size="3x" /></div><h4>continue with google</h4>
            </button>
            </Link>
        </>
    </Container>
  );
}

export default SignIn;
