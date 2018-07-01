import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

class UserForm extends Component {
  state = {
    username: 'geoboomrawrxd',
    password: 'P4ss$12345',
    // username: '',
    // password: '',
    usernameIcon: null,
    passwordIcon: null,
  };

  handleSubmit = async () => {
    const { username, password } = this.state;
    const { submit, formUse } = this.props;
    const res = await submit(username, password);
    if (formUse === 'signup' && res) {
      this.setState({
        username: '',
        password: '',
      });
    }
  };

  // eslint-disable-next-line react/no-typos
  componentDidMount() {
    Promise.all([
      Icon.getImageSource('md-person', 25, 'white'),
      Icon.getImageSource('md-lock', 25, 'white'),
    ]).then((result) => {
      this.setState({
        usernameIcon: result[0],
        passwordIcon: result[1],
      });
    });
  }

  render() {
    const {
      errorMessage, isLoading, formUse, gotoSignup,
    } = this.props;

    if (!(this.state.passwordIcon && this.state.usernameIcon)) return false;

    return (
      <KeyboardAwareScrollView
        enableOnAndroid
        scrollEnabled
        extraScrollHeight={-100}
        resetScrollToCoords={{ x: 0, y: 0 }}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#005580',
        }}
      >
        <View
          style={{
            alignItems: 'center',
          }}
        >
          {
            formUse === 'login' &&
            <Text
              style={{
                marginBottom: 45,
                fontSize: 40,
                color: '#ccffff',
              }}
            >
              TaskMe
            </Text>
          }
          {
            formUse === 'sign up' &&
            <Text
              style={{
                marginBottom: 45,
                fontSize: 30,
                color: '#ccffff',
              }}
            >
              Sign up
            </Text>
          }
          <View
            style={{
              width: 230,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomWidth: 2 * StyleSheet.hairlineWidth,
              borderBottomColor: 'white',
            }}
          >
            <Image
              source={this.state.usernameIcon}
              opacity={0.7}
              style={{
                margin: 5,
                padding: 10,
                width: 15,
                resizeMode: 'contain',
              }}
            />
            <TextInput
              style={{
                fontSize: 16,
                paddingBottom: 0,
                flex: 1,
                color: 'white',
              }}
              autoCorrect={false}
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              placeholder="Username"
              placeholderTextColor="#d9d9d9"
              selectionColor="grey"
              onChangeText={username => this.setState({ username })}
              value={this.state.username}
              returnKeyType="next"
              onSubmitEditing={() => { this.passwordInputRef.focus(); }}
              blurOnSubmit={false}
            />
          </View>
          <View
            style={{
              width: 230,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomWidth: 2 * StyleSheet.hairlineWidth,
              borderBottomColor: 'white',
              marginBottom: 15,
            }}
          >
            <Image
              source={this.state.passwordIcon}
              opacity={0.7}
              style={{
                margin: 5,
                padding: 10,
                width: 15,
                resizeMode: 'contain',
              }}
            />
            <TextInput
              style={{
                fontSize: 16,
                paddingBottom: 0,
                flex: 1,
                color: 'white',
              }}
              ref={(input) => { this.passwordInputRef = input; }}
              underlineColorAndroid="transparent"
              placeholder="Password"
              placeholderTextColor="#d9d9d9"
              selectionColor="grey"
              secureTextEntry
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
              returnKeyType="done"
              onSubmitEditing={this.handleSubmit}
            />
          </View>
          <Button
            containerViewStyle={{
              width: 230,
              borderRadius: 15,
              marginBottom: 10,
            }}
            buttonStyle={{
              height: 40,
              backgroundColor: '#0077b3',
            }}
            loading={isLoading}
            fontSize={18}
            borderRadius={15}
            title={isLoading ? '' : formUse.toUpperCase()}
            onPress={this.handleSubmit}
          />
          {
            formUse === 'login' &&
            <Text
              style={{
                color: '#66ffff',
                fontSize: 16,
              }}
              onPress={() => console.log('FORGOT PASSWORD PRESSED')}
            >
              Forgot password?
            </Text>
          }
          <View
            style={{
              height: 50,
            }}
          >
            <Text
              style={{
                color: '#ffcc00',
                textAlign: 'center',
                paddingLeft: 20,
                paddingRight: 20,
              }}
            >
              {errorMessage && errorMessage.toString()}
            </Text>
          </View>
        </View>
        <View
          style={{
            position: 'absolute',
            alignItems: 'center',
            bottom: 20,
            left: 0,
            right: 0,
          }}
        >
          {
            formUse === 'login' &&
            <Text
              style={{
                color: '#66ffff',
                fontSize: 16,
              }}
              onPress={gotoSignup}
            >
              Create an account
            </Text>
          }
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default UserForm;
