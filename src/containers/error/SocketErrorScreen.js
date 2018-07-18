import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Image,
} from 'react-native';
import { Button } from 'react-native-elements';

import { logout } from '../../actions/authActions';
import loadingGif from '../../../animeloading04.gif';

const SocketErrorScreen = ({ navigation, dispatch }) => {
  const error = navigation.getParam('error', {});

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}
    >
      <Text
        style={{
          fontSize: 24,
          color: 'black',
        }}
      >
        Oops! We ran into an error:
      </Text>
      <Text
        style={{
          fontSize: 24,
          color: 'orange',
        }}
      >
        {error}
      </Text>
      <Image
        style={{
          width: 400,
          height: 400,
          marginTop: 10,
          marginBottom: 25,
        }}
        source={loadingGif}
      />
      <Button
        raised
        containerStyle={{
          borderRadius: 20,
        }}
        buttonStyle={{
          backgroundColor: '#0077b3',
          width: 150,
        }}
        borderRadius={20}
        title="DISCONNECT"
        onPress={() => dispatch(logout())}
      />
    </View>
  );
};

const mapStateToProps = (state) => {
  const { auth: { refreshToken } } = state;
  return {
    refreshToken,
  };
};

export default connect(mapStateToProps)(SocketErrorScreen);
