import React from 'react';
import Header from '../Header';
import './styles.scss';

class GamePage extends React.Component {
  state = {
    gameID: '',
  }

  render() {
    return (
      <div id="gaming-page">
        <Header />
        <div className="main-content">
          <div className="player-symbol">Player symbol</div>
          <div className="currentPlayer">Player X is playing..</div>
          <div className="gamingBoard">
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
          </div>
        </div>
      </div>
    );
  }
}

export default GamePage;
