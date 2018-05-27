import React from 'react';
import { Text } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import JobsScreen from './JobsScreen';
import JobDetailsScreen from './JobDetailsScreen';

const headerStyle = {
  backgroundColor: '#4C3E54',
};

const headerTitleStyle = {
  textAlign: 'center',
};

const MenuButton = ({ navigation }) => {
  return (
    <Text
      style={{
        color: 'white',
      }}
      onPress={navigation.openDrawer}
    >
      Menu
    </Text>
  );
};

const JobStack = createStackNavigator({
  Jobs: {
    screen: JobsScreen,
  },
  // JobDetails: {
  //   screen: JobDetailsScreen,
  // },
}, {
  headerMode: 'float',
  navigationOptions: ({ navigation }) => ({
    headerStyle,
    headerTitleStyle,
    title: 'Jobs',
    headerTintColor: 'white',
    headerLeft: <MenuButton navigation={navigation} />,
  }),
});

export default JobStack;
