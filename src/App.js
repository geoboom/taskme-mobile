/* eslint-disable no-console */
import React, { Component } from 'react';
import { BackHandler, AppState, NetInfo } from 'react-native';
import { connect } from 'react-redux';
import { reduxifyNavigator } from 'react-navigation-redux-helpers';
import { NavigationActions } from 'react-navigation';

import AppSwitchNav from './containers';
import { socketConnect, socketDisconnect } from './actions/socketActions';
import { appStateChange, netInfoChange } from './actions/generalActions';
import { alertError, alertSuccess } from './actions/alertActions';

const mapStateToPropsNav = state => ({
  state: state.nav,
});

const AppWithNavigationState = connect(mapStateToPropsNav)(reduxifyNavigator(AppSwitchNav, 'root'));

class App extends Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    AppState.addEventListener('change', this.handleAppStateChange);
    // NetInfo.addEventListener('connectionChange', this.handleNetInfoChange);
  }
  componentDidUpdate(prevProps) {
    const { loggedIn, dispatch, appState, connectionType } = this.props;
    if (connectionType !== prevProps.connectionType) {
      if (connectionType === 'none') {
        dispatch(alertError('Network connection lost!'));
      }

      if (connectionType !== 'none') {
        dispatch(alertSuccess('Network connection regained! Attempting to' +
          ' reconnect to server...'));
      }
    }

    if (
      loggedIn
      && appState === 'active'
      && connectionType !== 'none'
      && (
        prevProps.loggedIn !== loggedIn
        || prevProps.appState !== 'active'
        || prevProps.connectionType !== connectionType
      )
    ) {
      // if logged in and there is connection
      console.log('dispatch(socketConnect())');
      dispatch(socketConnect());
    }

    if (
      (
        !loggedIn
        // || appState !== 'active'
        || connectionType === 'none'
      )
      && (
        prevProps.loggedIn !== loggedIn
        // || prevProps.appState === 'active'
        || prevProps.connectionType !== connectionType
      )
    ) {
      console.log('dispatch(socketDisconnect())');
      dispatch(socketDisconnect());
    }
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    AppState.removeEventListener('change', this.handleAppStateChange);
    NetInfo.removeEventListener('connectionChange', this.handleNetInfoChange);
    const { dispatch } = this.props;
    dispatch(socketDisconnect());
  }
  onBackPress = () => {
    const { dispatch, nav } = this.props;
    dispatch(NavigationActions.back());
    return nav !== this.props.nav;
  };
  handleAppStateChange = (nextAppState) => {
    const { dispatch } = this.props;
    dispatch(appStateChange(nextAppState));
  };
  handleNetInfoChange = (nextConnectionInfo) => {
    const { dispatch } = this.props;
    console.log('connectionInfo', nextConnectionInfo);
    dispatch(netInfoChange(nextConnectionInfo));
  };

  render() {
    return (
      <AppWithNavigationState />
    );
  }
}

const mapStateToProps = (state) => {
  const {
    nav,
    auth: {
      refreshToken,
    },
    general: {
      appState,
      connectionType,
    },
  } = state;
  return {
    connectionType,
    appState,
    nav,
    loggedIn: refreshToken,
  };
};

export default connect(mapStateToProps)(App);
