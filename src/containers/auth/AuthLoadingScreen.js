import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';

import loadingGif from '../../../animeloading01.gif';

class AuthLoadingScreen extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}
      >
        <Image
          source={loadingGif}
        />
      </View>
    );
  }
}

export default AuthLoadingScreen;
