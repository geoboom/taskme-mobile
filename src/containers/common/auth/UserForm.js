import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

class UserForm extends Component {
  state = {
    username: '',
    password: '',
  };

  handleSubmit = () => {
    const { username, password } = this.state;
    this.props.submit(username, password);
    if (this.props.formClear) {
      this.setState({
        username: '',
        password: '',
      });
    }
  };

  render() {
    const {
      errorMessage, isLoading, formUse, gotoSignup,
    } = this.props;

    return (
      <View
        style={{
          flex: 1,
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
              marginBottom: 10,
            }}
          >
            <View
              style={{
                width: 30,
                alignItems: 'center',
                opacity: 0.5,
              }}
            >
              <Icon
                name="md-person"
                size={25}
                color="white"
              />
            </View>
            <TextInput
              style={{
                fontSize: 16,
                paddingBottom: 3,
                flex: 1,
                color: 'white',
              }}
              underlineColorAndroid="transparent"
              placeholder="Username"
              placeholderTextColor="#d9d9d9"
              selectionColor="white"
              onChangeText={username => this.setState({ username })}
              value={this.state.username}
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
            <View
              style={{
                width: 30,
                alignItems: 'center',
                opacity: 0.5,
              }}
            >
              <Icon
                name="md-lock"
                size={25}
                color="white"
              />
            </View>
            <TextInput
              style={{
                fontSize: 16,
                paddingBottom: 3,
                flex: 1,
                color: 'white',
              }}
              underlineColorAndroid="transparent"
              placeholder="Password"
              placeholderTextColor="#f2f2f2"
              selectionColor="white"
              secureTextEntry
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
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
              onPress={() => console.log('testing')}
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
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          {
            formUse === 'login' &&
            <Text
              style={{
                fontSize: 16,
              }}
            >
              <Text
                style={{
                  color: '#00e6e6',
                }}
              >
                Or
              </Text> <Text
              style={{
                color: '#66ffff',
              }}
                onPress={gotoSignup}
              >
              create an account.
                      </Text>
            </Text>
          }
        </View>
      </View>
    );
  }
}

export default UserForm;
