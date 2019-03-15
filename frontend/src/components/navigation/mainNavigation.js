import React from 'react';
import { NavLink } from 'react-router-dom';
import './mainNavigation.css';

const mainNavigation = props => (
  <header className="main-navigation">
    <div className="main-navigation__logo">
      <h1>The Navbar</h1>
    </div>
    <div className="main-navigation__items">
      <ul>
        <li><NavLink to="/auth">Login</NavLink></li>
        <li><NavLink to="/events">Events</NavLink></li>
        <li><NavLink to="/bookings">Bookings</NavLink></li>
      </ul>
    </div>
  </header>
);

export default mainNavigation;