import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button } from 'react-native';

class TaskScreen extends Component {
  render() {
    const { user } = this.props;

    return (
      <View>
        <Text>
          Tasks Screen
        </Text>
        <Text>
          Welcome {JSON.stringify(user.userData)}
        </Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { user } = state;

  return {
    user,
  };
};

export default connect(mapStateToProps)(TaskScreen);
