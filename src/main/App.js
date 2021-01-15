import React, {useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import logo from '../logo.png';
import './App.css';
import SpaceForm from "./components/SpaceForm";
import BookingForm from "./components/BookingForm";
import Bookings from "./components/Bookings";
import Spaces from "./components/Spaces";

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 6000)
  }, [])


  return (
      <Router>
      <div className="App">
      {loading === false ? (
            <div>
            <header className="App-header">

              <p>
                Dibs App
              </p>
              <SpaceForm/>
              <BookingForm/>
              <Bookings/>
              <Spaces/>
            </header>
          <Switch>
            <Route path="/about">
              <h1> About</h1>
            </Route>
            <Route path="/users">
              <h1> About</h1>
            </Route>
            <Route path="/">
            </Route>
          </Switch>
            </div>

      ) : (
          <img src={logo} className="App-logo" alt="logo" />
      )}
      </div>
        </Router>
  );
}

export default App;
