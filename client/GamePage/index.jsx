import React from 'react';
import PropTypes from 'proptypes';
import { connect } from 'react-redux';
import Header from '../Header';
import { joinGame } from '../actions';
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
      this.setState({ joining: true }, () => dispatch(joinGame(gameID, firstPlayer === 'X' ? 'O' : 'X')));
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

  render() {
    const { startGame, joining } = this.state;
    const { playerSymbol } = this.props;
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
          </div>
        </div>
      );
    }
    return component;
  }
}

GamePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  gameStatus: PropTypes.string.isRequired,
  gameURL: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  playerSymbol: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  gameStatus: state.gameStatus,
  gameURL: state.gameURL,
  playerSymbol: state.playerSymbol,
});

export default connect(mapStateToProps)(GamePage);
