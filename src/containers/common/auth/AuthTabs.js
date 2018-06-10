import React, { Component } from 'react';
import { View, Text, Button, TextInput, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { createMaterialTopTabNavigator } from 'react-navigation';

import AlertToast from '../../../components/AlertToast';
import { userLogin, userSignup } from '../../../actions/userActions';

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
      <View>
        <AlertToast />
        <UserForm
          buttonTitle="Login"
          submit={this.handleSubmit}
          errorMessage={errorMessage.login}
          isLoading={isLoading.login}
          formClear={formClear.login}
        />
      </View>
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
      <View>
        <AlertToast />
        <UserForm
          buttonTitle="Signup"
          submit={this.handleSubmit}
          errorMessage={errorMessage.signup}
          isLoading={isLoading.signup}
          formClear={formClear.signup}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    isLoading,
    errorMessage,
    formClear,
  } = state.user;

  return {
    isLoading,
    errorMessage,
    formClear,
  };
};

const ConnectedAlertLoginScreen = connect(mapStateToProps)(LoginScreen);
const ConnectedAlertSignupScreen = connect(mapStateToProps)(SignupScreen);

const AuthTabs = createMaterialTopTabNavigator({
  Login: {
    screen: ConnectedAlertLoginScreen,
  },
  Signup: {
    screen: ConnectedAlertSignupScreen,
  },
});

export default AuthTabs;
