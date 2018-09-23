import React from 'react';
import PropTypes from 'proptypes';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../Header';
import { createGame } from '../actions';
import './styles.scss';

class GamePage extends React.PureComponent {
  componentDidMount() {
    const { socketID, playerSymbol, dispatch } = this.props;
    dispatch(createGame(socketID, playerSymbol));
  }

  renderGameInvite() {
    const { gameStatus, gameURL } = this.props;
    if (gameStatus === 'waiting for second player') {
      return (
        <div className="game-invite">
          <span>Game Invite: </span>
          <span>{gameURL}</span>
        </div>
      );
    } return null;
  }

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
          <br />
          {this.renderGameInvite()}
        </div>
      </div>
    );
  }
}

GamePage.propTypes = {
  gameStatus: PropTypes.string.isRequired,
  gameURL: PropTypes.string.isRequired,
  playerSymbol: PropTypes.string.isRequired,
  playerSet: PropTypes.array.isRequired,
  socketID: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  gameStatus: state.gameStatus,
  gameURL: state.gameURL,
  socketID: state.socketID,
  playerSymbol: state.playerSymbol,
  playerSet: state.playerSet,
});

export default connect(mapStateToProps)(GamePage);
