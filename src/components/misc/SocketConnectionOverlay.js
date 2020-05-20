/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

class SocketConnectionOverlay extends Component {
  render() {
    const { socketConnection } = this.props;

    if (socketConnection === 'connecting') {
      return (
        <View
          style={{
            position: 'absolute',
          }}
        >
          <Text>
            Connecting to server...
          </Text>
        </View>
      );
    }
    return null;
  }
}

const mapStateToProps = (state) => {
  const { general: { socketConnection } } = state;
  return {
    socketConnection,
  };
};

export default connect(mapStateToProps)(SocketConnectionOverlay);
