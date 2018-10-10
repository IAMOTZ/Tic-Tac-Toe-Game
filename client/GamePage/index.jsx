import React from 'react';
import PropTypes from 'proptypes';
import { connect } from 'react-redux';
import socket from '../socket';
import Header from '../Header';
import { joinGame, placeSymbol } from '../actions';
import './styles.scss';

class GamePage extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      joining: false,
      startGame: false,
    };
  }

  componentWillMount() {
    const { location: { search }, gameStatus, dispatch } = this.props;
    const urlMatch = search.match(/^\?id=(.+)&firstPlayer=(O|X)$/);
    const [, gameID, firstPlayer] = urlMatch || [];
    if (gameStatus !== 'waiting for second player' && gameID && firstPlayer) {
      const secondPlayer = firstPlayer === 'X' ? 'O' : 'X';
      this.setState({ joining: true }, () => dispatch(joinGame(gameID, secondPlayer, firstPlayer)));
    } else if (gameStatus !== 'waiting for second player' && !gameID && !firstPlayer) {
      const { history } = this.props;
      history.push('/');
    }
  }

  componentDidUpdate() {
    const { gameStatus } = this.props;
    const { startGame } = this.state;
    if (gameStatus === 'start game' && !startGame) {
      this.setState({ startGame: true }); // eslint-disable-line react/no-did-update-set-state
    }
  }

  placeSymbol(xCord, yCord) {
    const {
      currentPlayer, gameID, playerSymbol, socketID, dispatch,
    } = this.props;
    if (currentPlayer === playerSymbol) {
      socket.emit('PLACE_SYMBOL', {
        gameID, socketID, xCord, yCord,
      });
      dispatch(placeSymbol(xCord, yCord));
    } else {
      // @TODO: Inform the user that he is not the current player, so he can place symbol
    }
  }

  renderGameInvite() {
    const { gameURL } = this.props;
    return (
      <div className="game-invite">
        <span>Game Invite: </span>
        <span>{gameURL}</span>
      </div>
    );
  }

  renderGameLoading() {
    return (<h1>Loading...</h1>);
  }

  renderGameBoard() {
    const { gameBoard } = this.props;
    const gameBoardArray = gameBoard.reduce((acc, curr) => [...acc, ...curr], []);
    return (
      <div className="gamingBoard">
        {gameBoardArray.map(cell => (
          <div onClick={() => this.placeSymbol(cell.xCord, cell.yCord)}>
            {cell.symbol.toUpperCase()}
          </div>
        ))}
      </div>
    );
  }

  render() {
    const { startGame, joining } = this.state;
    const { playerSymbol, currentPlayer } = this.props;
    let component = null;
    if (!startGame && !joining) {
      component = this.renderGameInvite();
    } else if (!startGame && joining) {
      component = (this.renderGameLoading());
    } else {
      component = (
        <div id="gaming-page">
          <Header />
          <div className="main-content">
            <div className="player-symbol">
              <span>{`Player symbol: ${playerSymbol.toUpperCase()}`}</span>
            </div>
            <div className="currentPlayer">Player {currentPlayer.toUpperCase()} is playing...</div>
            {this.renderGameBoard()}
            <br />
          </div>
        </div>
      );
    }
    return component;
  }
}

GamePage.propTypes = {
  currentPlayer: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  gameBoard: PropTypes.array.isRequired,
  gameID: PropTypes.array.isRequired,
  gameStatus: PropTypes.string.isRequired,
  gameURL: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  playerSymbol: PropTypes.string.isRequired,
  socketID: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  currentPlayer: state.currentPlayer,
  gameBoard: state.gameBoard,
  gameID: state.gameID,
  gameStatus: state.gameStatus,
  gameURL: state.gameURL,
  playerSymbol: state.playerSymbol,
  socketID: state.socketID,
});

export default connect(mapStateToProps)(GamePage);
