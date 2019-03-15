import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import AuthPage from './pages/auth';
import EventsPage from './pages/events';
import BookingsPage from './pages/bookings';
import MainNavigation from './components/navigation/mainNavigation';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <React.Fragment>
      <MainNavigation />
      <main className="main-content">
        <Switch>
          <Redirect from="/" to="/auth" exact/>
          <Route path="/auth" component={AuthPage}/>
          <Route path="/events" component={EventsPage}/>
          <Route path="/bookings" component={BookingsPage}/>
        </Switch>
      </main>
      </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
