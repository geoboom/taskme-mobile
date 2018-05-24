import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
} from 'react-native';

class UserAuthForm extends Component {
  state = {
    username: '',
    password: '',
  };

  resetFields = () => {
    this.setState({
      username: '',
      password: '',
    });
  };

  handleInputChange = name => (text) => {
    this.setState({
      [name]: text,
    });
  };

  render() {
    const { buttonProps, onPressResetFields, error } = this.props;
    const { onPress, ...rest } = buttonProps;

    return (
      <View>
        <TextInput
          style={{ height: 60, fontSize: 20 }}
          placeholder="Username"
          value={this.state.username}
          onChangeText={this.handleInputChange('username')}
        />
        <TextInput
          style={{ height: 60, fontSize: 20 }}
          placeholder="Password"
          value={this.state.password}
          onChangeText={this.handleInputChange('password')}
        />
        <Button
          onPress={
            () => {
              onPress(this.state.username, this.state.password);
              if (onPressResetFields) {
                this.resetFields();
              }
            }
          }
          {...rest}
        />
        <Text style={{ color: 'red' }}>
          {error}
        </Text>
      </View>
    );
  }
}

export default UserAuthForm;
