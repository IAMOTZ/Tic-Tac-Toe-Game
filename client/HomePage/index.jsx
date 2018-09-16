import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'proptypes';
import Header from '../Header';
import { setPlayerSymbol } from '../actions';
import './styles.scss';


class HomePage extends React.PureComponent {
  state = {
    redirectToGamePage: false,
  }

  setPlayerSymbol = () => {
    const { dispatch } = this.props;
    const playerSymbol = prompt('Choose a Player Symbol(X or O)');
    if (playerSymbol) {
      dispatch(setPlayerSymbol(playerSymbol));
      this.setState({ redirectToGamePage: true });
    }
  }

  render() {
    const { redirectToGamePage } = this.state;
    if (redirectToGamePage) {
      return (<Redirect to="/game" />);
    }
    return (
      <div id="homepage">
        <Header />
        <div id="main-content">
          <button type="button" onClick={this.setPlayerSymbol}>Create New Game</button>
          <button type="button" onClick={this.setPlayerSymbol}>Join Random Bame</button>
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(HomePage);
