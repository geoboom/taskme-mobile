import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import AuthLoadingScreen from './containers/common/AuthLoadingScreen';
import AuthScreen from './containers/common/AuthScreen';
import AdminHomeScreen from './containers/admin/AdminHomeScreen';
import StandardHomeScreen from './containers/standard/StandardHomeScreen';

// noinspection JSUnusedGlobalSymbols
const AdminStack = createStackNavigator({
  AdminHome: {
    screen: AdminHomeScreen,
  },
}, {
  navigationOptions: ({ navigation }) => ({
    title: navigation.state.routeName,
  }),
});
// noinspection JSUnusedGlobalSymbols
const StandardStack = createStackNavigator({
  StandardHome: {
    screen: StandardHomeScreen,
  },
}, {
  navigationOptions: ({ navigation }) => ({
    title: navigation.state.routeName,
  }),
});
const RootStack = createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  Auth: AuthScreen,
  Admin: AdminStack,
  Standard: StandardStack,
}, {
  initialRouteName: 'AuthLoading',
});

const initialUserData = {
  _id: null,
  username: null,
  group: null,
  lastSuccessfulLoginTimestamp: null,
};

export default class App extends Component {
  state = {
    testStateProp: 'testing123',
    isLoggedIn: null,
    refreshToken: null,
    accessToken: null,
    userData: initialUserData,
    tasks: [],
    jobs: [],
  };

  componentDidMount() {
    // TODO: check if refreshToken exists in asyncStorage
  }

  setAccessToken = async accessToken => Promise.all([
    this.setState({
      accessToken,
    }),
    AsyncStorage.setItem('accessToken', accessToken),
  ]);

  setRefreshToken = async refreshToken => Promise.all([
    this.setState({
      refreshToken,
    }),
    AsyncStorage.setItem('refreshToken', refreshToken),
  ]);

  getRefreshToken = async () => {
    if (this.state.refreshToken) {
      return this.state.refreshToken;
    }

    const refreshToken = await AsyncStorage.getItem('refreshToken');
    if (!refreshToken) {
      return null;
    }

    this.setState({
      refreshToken,
    });
    return refreshToken;
  };

  setUserData = async (userData) => {
    const {
      _id, username, group, lastSuccessfulLoginTimestamp,
    } = userData;

    return Promise.all([
      this.setState({
        userData,
      }),
      AsyncStorage.setItem('user:_id', _id),
      AsyncStorage.setItem('user:username', username),
      AsyncStorage.setItem('user:group', group),
      AsyncStorage.setItem('user:lastSuccessfulLoginTimestamp', lastSuccessfulLoginTimestamp),
    ]);
  };

  render() {
    return (
      <RootStack
        screenProps={{
          setUserData: this.setUserData,
          getRefreshToken: this.getRefreshToken,
          setAccessToken: this.setAccessToken,
          setRefreshToken: this.setRefreshToken,
          userData: this.state.userData,
          tasks: this.state.tasks,
          jobs: this.state.jobs,
        }}
      />
    );
  }
}

