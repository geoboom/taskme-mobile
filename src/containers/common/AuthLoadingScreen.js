import React, { Component } from 'react';
import axios from 'axios';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View,
  Text,
} from 'react-native';

import CONSTANTS from '../../constants';

export default class AuthLoadingScreen extends Component {
  state = {
    error: '',
  };

  componentDidMount() {
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    try {
      const { navigation, screenProps } = this.props;
      const {
        setUserData, getRefreshToken,
      } = screenProps;
      const refreshToken = await getRefreshToken();

      if (!refreshToken) {
        return navigation.navigate('Auth');
      }

      const payload = {
        refreshToken,
      };
      const response = await axios.post(`${CONSTANTS.SERVER_URL}/auth/token`, payload);
      const { userData } = response.data;

      await setUserData(userData);

      switch (userData.group) {
        case 'Admin':
          return navigation.navigate('Admin');
        case 'Worker':
          return navigation.navigate('Standard');
        default:
          return navigation.navigate('Auth');
      }
    } catch (e) {
      // check if refreshToken expired error
      this.setState({
        error: e,
      });
      console.log('AuthLoadingScreen ERROR:', e);
    }
  };

  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
        <Text style={{ color: 'red' }}>
          {this.state.error.toString()}
        </Text>
      </View>
    );
  }
}
