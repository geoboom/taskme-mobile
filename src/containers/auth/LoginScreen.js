import React, { Component } from 'react';
import { View } from 'react-native';

import AlertToast from '../../components/AlertToast';
import UserForm from './UserForm';
import { userLogin } from '../../actions/userActions';
import { login } from '../../actions/authActions';

class LoginScreen extends Component {
  handleSubmit = async (username, password) => {
    const { dispatch } = this.props;

    return dispatch(login(username, password));
  };

  render() {
    const {
      errorMessage, isLoading, navigation,
    } = this.props;

    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <AlertToast />
        <UserForm
          formUse="login"
          submit={this.handleSubmit}
          errorMessage={errorMessage.login}
          isLoading={isLoading.login}
          gotoSignup={() => navigation.navigate('Signup')}
        />
      </View>
    );
  }
}

export default LoginScreen;
