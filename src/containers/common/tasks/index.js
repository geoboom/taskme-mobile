import React from 'react';
import { Text } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import TasksScreen from './TasksScreen';

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

const TaskStack = createStackNavigator({
  Tasks: {
    screen: TasksScreen,
  },
}, {
  headerMode: 'float',
  navigationOptions: ({ navigation }) => ({
    headerStyle,
    headerTitleStyle,
    title: 'Tasks',
    headerTintColor: 'white',
    headerLeft: <MenuButton navigation={navigation} />,
  }),
});

export default TaskStack;
