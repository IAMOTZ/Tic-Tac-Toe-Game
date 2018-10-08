import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'proptypes';
import Header from '../Header';
import { createGame } from '../actions';
import './styles.scss';

class HomePage extends React.PureComponent {
  state = {
    redirectToGamePage: false,
  }

  createGame = () => {
    const {
      dispatch, playerSet, socketID,
    } = this.props;
    const choosenSymbol = prompt('Choose a Player Symbol(X or O)') || '';
    if (playerSet.includes(choosenSymbol.toUpperCase())) {
      this.setState({ redirectToGamePage: true },
        () => dispatch(createGame(socketID, choosenSymbol.toUpperCase())));
    } else {
      // @TODO: Inform the player that the symbol selected is not valid.
    }
  }

  render() {
    const { redirectToGamePage } = this.state;
    const { gameID, playerSymbol } = this.props;
    if (redirectToGamePage && gameID) {
      const url = `/game?id=${gameID}&firstPlayer=${playerSymbol}`;
      return (<Redirect to={url} />);
    }
    return (
      <div id="homepage">
        <Header />
        <div id="main-content">
          <button type="button" onClick={this.createGame}>Create New Game</button>
          <button type="button" onClick={this.createGame}>Join Random Bame</button>
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  gameID: PropTypes.string,
  playerSet: PropTypes.array.isRequired,
  playerSymbol: PropTypes.string.isRequired,
  socketID: PropTypes.string.isRequired,
};

HomePage.defaultProps = {
  gameID: '',
};

const mapStateToProps = state => ({
  playerSymbol: state.playerSymbol,
  playerSet: state.playerSet,
  socketID: state.socketID,
  gameID: state.gameID,
});

export default connect(mapStateToProps)(HomePage);
