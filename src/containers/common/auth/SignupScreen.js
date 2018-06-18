import React, { Component } from 'react';
import { View } from 'react-native';

import AlertToast from '../../../components/AlertToast';
import UserForm from './UserForm';
import { userSignup } from '../../../actions/userActions';

class SignupScreen extends Component {
  handleSubmit = (username, password) => {
    const { dispatch } = this.props;

    return dispatch(userSignup(username, password));
  };

  render() {
    const { formClear, errorMessage, isLoading } = this.props;

    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <AlertToast />
        <UserForm
          formUse="sign up"
          submit={this.handleSubmit}
          errorMessage={errorMessage.signup}
          isLoading={isLoading.signup}
          formClear={formClear.signup}
        />
      </View>
    );
  }
}

export default SignupScreen;
