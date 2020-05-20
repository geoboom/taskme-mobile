import { connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation';

import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';

const mapStateToProps = (state) => {
  const {
    isLoading,
    errorMessage,
  } = state.auth;

  return {
    isLoading,
    errorMessage,
  };
};

const ConnectedAlertLoginScreen = connect(mapStateToProps)(LoginScreen);
const ConnectedAlertSignupScreen = connect(mapStateToProps)(SignupScreen);

const AuthTabs = createStackNavigator(
  {
    Login: {
      screen: ConnectedAlertLoginScreen,
    },
    Signup: {
      screen: ConnectedAlertSignupScreen,
    },
  },
  {
    headerMode: 'none',
  },
);

export default AuthTabs;
