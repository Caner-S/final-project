import React, {useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import logo from '../logo.png';
import './App.css';
import Login from "./components/Login";
import firebase from '../config/firebase';
import NavBar from "./components/NavBar/NavBar";
import MyBookings from "./components/MyBookings";
import ParticlesBg from 'particles-bg';
import {getAdmin} from "./dao/UserDao";
import Home from "./components/Home";
import Admin from "./components/Admin";
import Stats from "./components/Stats";
import {getSiteInformation} from "./dao/EnvironmentDao";

function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(false);
  const [businessCase, setBusinessCase] = useState(false);

  const mystyle = {
    width: "100%",
    height: "100%",
    position: "fixed",
    zIndex: "-100",
    top: "0px",
    left: "0px",
  };

  useEffect( () => {
    getSiteInformation().onSnapshot(snapshot => {
      if (snapshot.data() === undefined) {
        setBusinessCase(false);
      } else {
        setBusinessCase(snapshot.data().businessCase);
      }});

    setTimeout(() => setLoading(false), 1000);
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      setUser(!!user);
        getAdmin(firebase.auth().currentUser.uid).onSnapshot(res => {
          if(res.docs[0] !== undefined){
            setAuth(true);
          }
        });
    });

    return () => unregisterAuthObserver();
  }, [])

  function adminPage() {
    if(auth){

      return <Route path="/admin" >
        <Admin businessCase={businessCase}/>
      </Route>
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
        <ParticlesBg id="testtt" type="circle" color={["#c0fdff", "#d0d1ff","#deaaff","#ecbcfd","#ffcbf2",]} num={5} bg={true} classname="background"/>
        </Router>



  );
}

export default App;
