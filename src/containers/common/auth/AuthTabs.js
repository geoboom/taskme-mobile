import React, { Component, Children, cloneElement } from 'react';
import { View, Text, Button, TextInput, ActivityIndicator, ToastAndroid } from 'react-native';
import { connect } from 'react-redux';
import { createMaterialTopTabNavigator } from 'react-navigation';

import { userLogin, userSignup } from '../../../actions/userActions';
import { alertClear, alertSuccess } from '../../../actions/alertActions';

class UserForm extends Component {
  state = {
    username: 'geoboomrawrxd',
    password: 'P4ss$12345',
  };

  handleSubmit = () => {
    const { username, password } = this.state;
    this.props.submit(username, password);
    if (this.props.formClear) {
      this.setState({
        username: '',
        password: '',
      });
    }
  };

  render() {
    const {
      buttonTitle, errorMessage, isLoading,
    } = this.props;

    return (
      <View
        style={{ flexDirection: 'column', justifyContent: 'center' }}
      >
        <Text>
          Username
        </Text>
        <TextInput
          style={{ height: 40 }}
          onChangeText={username => this.setState({ username })}
          value={this.state.username}
        />
        <Text>
          Password
        </Text>
        <TextInput
          style={{ height: 40 }}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button
          title={buttonTitle}
          onPress={this.handleSubmit}
        />
        <Text style={{ color: 'red' }}>
          {errorMessage && errorMessage.toString()}
        </Text>
        {
          isLoading
          ?
            <ActivityIndicator />
          :
            null
        }
      </View>
    );
  }
}

class LoginScreen extends Component {
  handleSubmit = (username, password) => {
    const { dispatch } = this.props;

    return dispatch(userLogin(username, password));
  };

  render() {
    const { formClear, errorMessage, isLoading } = this.props;

    return (
      <UserForm
        buttonTitle="Login"
        submit={this.handleSubmit}
        errorMessage={errorMessage.login}
        isLoading={isLoading.login}
        formClear={formClear.login}
      />
    );
  }
}

class SignupScreen extends Component {
  handleSubmit = (username, password) => {
    const { dispatch } = this.props;

    return dispatch(userSignup(username, password));
  };

  render() {
    const { formClear, errorMessage, isLoading } = this.props;

    return (
      <UserForm
        buttonTitle="Signup"
        submit={this.handleSubmit}
        errorMessage={errorMessage.signup}
        isLoading={isLoading.signup}
        formClear={formClear.signup}
      />
    );
  }
}

const WithAlertWrapper = (WrappedComponent) => (
  class WithAlert extends Component {
    state = {
      type: '',
      message: '',
    };

    static getDerivedStateFromProps(props, state) {
      const { alert, dispatch } = props;
      const { type, message } = alert;

      if (!(type === state.type && message === state.message)) {
        dispatch(alertClear());
        return {
          ...state,
          type,
          message,
        };
      }

      return state;
    }

    render() {
      const { alert, ...rest } = this.props;
      const { type, message } = this.state;

      return (
        <View>
          <WrappedComponent {...rest} />
          {
            type && message
              ?
              ToastAndroid.showWithGravity(
                message,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
              )
              :
              null
          }
        </View>
      );
    }
  }
);

const mapStateToProps = (state) => {
  const {
    isLoading,
    errorMessage,
    formClear,
  } = state.user;

  return {
    alert: state.alert,
    isLoading,
    errorMessage,
    formClear,
  };
};

const WithAlertLoginScreen = WithAlertWrapper(LoginScreen);
const WithAlertSignupScreen = WithAlertWrapper(SignupScreen);

const AuthTabs = createMaterialTopTabNavigator({
  Login: {
    screen: connect(mapStateToProps)(WithAlertLoginScreen),
  },
  Signup: {
    screen: connect(mapStateToProps)(WithAlertSignupScreen),
  },
});

export default AuthTabs;
