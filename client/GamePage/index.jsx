import React from 'react';
import PropTypes from 'proptypes';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../Header';
import './styles.scss';

class GamePage extends React.PureComponent {
  render() {
    const { playerSymbol, playerSet } = this.props;
    if (!playerSet.includes(playerSymbol)) {
      return (<Redirect to="/" />);
    }
    return (
      <div id="gaming-page">
        <Header />
        <div className="main-content">
          <div className="player-symbol">
            <span>{`Player symbol: ${playerSymbol.toUpperCase()}`}</span>
          </div>
          <div className="currentPlayer">Player .. is playing...</div>
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

GamePage.propTypes = {
  playerSymbol: PropTypes.string.isRequired,
  playerSet: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  playerSymbol: state.playerSymbol,
  playerSet: state.playerSet,
});

export default connect(mapStateToProps)(GamePage);
