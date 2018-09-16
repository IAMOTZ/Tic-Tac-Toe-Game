import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import './styles.scss';

const HomePage = () => (
  <div id="homepage">
    <Header />
    <div id="main-content">
      <button type="button">
        <Link to="/game">Create New Game</Link>
      </button>
      <button type="button">
        <Link to="/game">Join Random Bame</Link>
      </button>
    </div>
  </div>
);

export default HomePage;
