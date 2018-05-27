import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';

class AuthLoadingScreen extends Component {
  render() {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }
}

export default AuthLoadingScreen;
