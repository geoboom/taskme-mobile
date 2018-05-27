import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import { connect } from 'react-redux';
import {
  createReduxBoundAddListener,
} from 'react-navigation-redux-helpers';
import {
  NavigationActions,
} from 'react-navigation';

import AppSwitchNav from './containers';
import socketActionTypes from './constants';

const addListener = createReduxBoundAddListener('root');

class App extends Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    this.props.dispatch({
      type: socketActionTypes.DISCONNECT,
    });
    console.log('disconnect');
  }
  onBackPress = () => {
    const { dispatch, nav } = this.props;
    if (nav.index === 0) { return false; }
    dispatch(NavigationActions.back());
    return true;
  };

  render() {
    const { dispatch, nav } = this.props;
    const navigation = {
      dispatch,
      state: nav,
      addListener,
    };

    return (
      <AppSwitchNav
        navigation={navigation}
      />
    );
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(App);
