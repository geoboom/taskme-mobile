/* eslint-disable no-console */
import React, { Component } from 'react';
import { BackHandler, AppState, NetInfo } from 'react-native';
import { connect } from 'react-redux';
import { reduxifyNavigator } from 'react-navigation-redux-helpers';
import { NavigationActions } from 'react-navigation';
import { withNetworkConnectivity } from 'react-native-offline';

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
    NetInfo.addEventListener('connectionChange', this.handleNetInfoChange);
  }
  componentDidUpdate(prevProps) {
    const {
      loggedIn, dispatch, appState, connectionType, isConnected, socketConnection,
    } = this.props;

    if (
      loggedIn
      && socketConnection === 'disconnected'
      && appState === 'active'
      && connectionType !== 'none'
      && isConnected
      && (
        prevProps.loggedIn !== loggedIn
        || prevProps.appState !== 'active'
        || prevProps.connectionType !== connectionType
        || !prevProps.isConnected
      )
    ) {
      // if logged in and client is online
      console.log('dispatch(socketConnect())');
      dispatch(alertSuccess('Connecting to server...'));
      dispatch(socketConnect());
    }
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    AppState.removeEventListener('change', this.handleAppStateChange);
    NetInfo.removeEventListener('connectionChange', this.handleNetInfoChange);
    const { dispatch } = this.props;
    console.log('dispatch(socketDisconnect())');
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
      socketConnection,
    },
    network: {
      isConnected,
    },
  } = state;
  return {
    socketConnection,
    connectionType,
    appState,
    nav,
    loggedIn: refreshToken,
    isConnected,
  };
};

const ConnectedApp = connect(mapStateToProps)(App);

const opts = {
  withRedux: true,
  checkConnectionInterval: 3000,
};

export default withNetworkConnectivity(opts)(ConnectedApp);
