import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { createMaterialTopTabNavigator } from 'react-navigation';
import { ToastAndroid } from 'react-native';

import CONSTANTS from '../../constants';
import UserAuthForm from '../../components/UserAuthForm';

class LoginScreen extends Component {
  static propTypes = {
    screenProps: PropTypes.object.isRequired,
  };

  render() {
    const { error, handleLogin } = this.props.screenProps;

    return (
      <UserAuthForm
        error={error}
        buttonProps={{
          onPress: handleLogin,
          title: 'Login',
        }}
      />
    );
  }
}

class SignupScreen extends Component {
  handlePress = async (username, password) => {
    const { navigation, screenProps } = this.props;

    const userData = await screenProps.handleSignup(username, password);
    if (userData) {
      ToastAndroid.showWithGravity(
        `Successfully signed up with ${userData.username}`,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      navigation.navigate('Login');
    }
  };

  render() {
    const { error } = this.props.screenProps;

    return (
      <UserAuthForm
        onPressResetFields
        error={error}
        buttonProps={{
          onPress: this.handlePress,
          title: 'Sign Up',
        }}
      />
    );
  }
}

const AuthTabNav = createMaterialTopTabNavigator({
  Login: {
    screen: LoginScreen,
  },
  Signup: {
    screen: SignupScreen,
  },
});

export default class AuthScreen extends Component {
  state = {
    error: '',
  };

  handleLogin = async (username, password) => {
    try {
      const { setRefreshToken, setUserData } = this.props.screenProps;
      const payload = {
        username,
        password,
      };
      // const response = await axios.post(
      //   `${CONSTANTS.SERVER_URL}/auth/login`,
      //   payload,
      // );
      // const { refreshToken, userData } = response.data;
      // return userData;
      const refreshToken = 'dummytoken';
      const userData = {
        _id: 'testingID',
        username,
        group: 'worker',
        lastSuccessfulLoginTimestamp: 'testing',
      };

      await Promise.all([
        setRefreshToken(refreshToken),
        setUserData(userData),
      ]);
    } catch (e) {
      console.log('AuthScreen ERROR:', e);
    }
  };
  handleSignup = async (username, password) => {
    try {
      const payload = {
        username,
        password,
      };
      // const response = await axios.post(`${CONSTANTS.SERVER_URL}/auth/signup`, payload);
      // const { userData } = response.data;
      // return userData;
      return ({ username });
    } catch (e) {
      console.log('AuthScreen ERROR:', e);
    }
  };

  render() {
    return (
      <AuthTabNav
        screenProps={{
          handleLogin: this.handleLogin,
          handleSignup: this.handleSignup,
          error: this.state.error,
        }}
      />
    );
  }
}
