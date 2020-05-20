import React from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import {
  createDrawerNavigator,
  SafeAreaView,
  NavigationActions,
} from 'react-navigation';
import moment from 'moment';

import { adminRoutes, standardRoutes } from './mapping';
import { logout } from '../../actions/authActions';
import profilePicture from '../../../profilepicture01.png';

const CustomDrawerComponent = (props) => {
  const {
    dispatch, userData, navigation, activeItemKey, items,
  } = props;
  const { username, group, lastSuccessfulLoginTimestamp } = userData;

  const navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    });
    navigation.dispatch(navigateAction);
  };

  return (
    <ScrollView>
      <SafeAreaView
        style={{
          flex: 1,
        }}
        forceInset={{
          top: 'always',
          horizontal: 'never',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#e6e6ff',
            padding: 4,
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <Image
            style={{
              width: 100,
              height: 100,
            }}
            resizeMode="contain"
            source={profilePicture}
          />
          <View>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 18,
              }}
            >
              {username}
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 18,
              }}
            >
              {group}
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 18,
              }}
            >
              {moment(lastSuccessfulLoginTimestamp).format('DD-MM-YYYY HH:MM:SS')}
            </Text>
          </View>
        </View>
        {
          items.map(item => (
            <TouchableOpacity
              key={item.key}
              onPress={navigateToScreen(item.key)}
              disabled={item.key === activeItemKey}
            >
              <View
                style={{
                  backgroundColor: item.key === activeItemKey ? '#f2f2f2' : 'white',
                  padding: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                  }}
                >
                  {item.key}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        }
        <TouchableOpacity
          onPress={() => {
            dispatch(logout());
          }}
        >
          <View
            style={{
              backgroundColor: 'white',
              padding: 10,
            }}
          >
            <Text
              style={{
                fontSize: 18,
              }}
            >
              Logout
            </Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  const { auth: { userData } } = state;
  return {
    userData,
  };
};

const drawerConfig = {
  drawerWidth: 300,
  contentComponent: connect(mapStateToProps)(CustomDrawerComponent),
};


export const MainDrawerStandard = createDrawerNavigator(
  standardRoutes,
  drawerConfig,
);

export const MainDrawerAdmin = createDrawerNavigator(
  adminRoutes,
  drawerConfig,
);
