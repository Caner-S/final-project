import React, {useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import logo from '../logo.png';
import './App.css';
import SpaceForm from "./components/SpaceForm";
import Login from "./components/Login";
import firebase from '../config/firebase';
import NavBar from "./components/NavBar/NavBar";
import MyBookings from "./components/MyBookings";
import ParticlesBg from 'particles-bg';
import {getAdmin} from "./dao/UserDao";
import AllBookings from "./components/AllBookings";
import Home from "./components/Home";
import Admin from "./components/Admin";
import Stats from "./components/Stats";

function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(false);
  const [businessCase, setBusinessCase] = useState(true);

  useEffect( () => {

    setTimeout(() => setLoading(false), 1000);
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      setUser(!!user);
        getAdmin(firebase.auth().currentUser.uid).onSnapshot(res => {
          console.log(res.docs[0]);
          if(res.docs[0] !== undefined){
            setAuth(true);
          }
        });
    });

    return () => unregisterAuthObserver();
  }, [])

  function adminPage() {
    if(auth){
      return <Route path="/admin" component={Admin}/>
    }
  }

  return (
      <Router>
      <div className="App">
      {loading === false ? (
            user  ?
            <div>
              <img src={logo} className="App-logo" alt="logo" />
              <NavBar auth={auth}/>
          <Switch>
            <Route path="/mybookings">
              <MyBookings/>
            </Route>
            {adminPage()}
            <Route path="/stats">
              <Stats/>
            </Route>
            <Route path="/" >
              <Home businessCase={businessCase}/>
            </Route>
          </Switch>
            </div>
                :
                <div className="login">
                <img src={logo} className="App-logo-login" alt="logo" />
                <Login/>
                </div>

      ) : (
          <img src={logo} className="App-logo-loading" alt="logo" />

      )}
      </div>
        <ParticlesBg type="circle" color={["#c0fdff", "#d0d1ff","#deaaff","#ecbcfd","#ffcbf2",]} num={5} bg={true} />
        </Router>

  );
}

export default App;
