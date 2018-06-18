import React, { Component } from 'react';
import { View } from 'react-native';

import AlertToast from '../../../components/AlertToast';
import UserForm from './UserForm';
import { userLogin } from '../../../actions/userActions';

class LoginScreen extends Component {
  handleSubmit = (username, password) => {
    const { dispatch } = this.props;

    return dispatch(userLogin(username, password));
  };

  render() {
    const { formClear, errorMessage, isLoading, navigation } = this.props;

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
          formClear={formClear.login}
          gotoSignup={() => navigation.navigate('Signup')}
        />
      </View>
    );
  }
}

export default LoginScreen;
