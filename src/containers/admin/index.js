import React from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView } from 'react-native';
import { createDrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation';

import JobStack from './jobs';
import TaskStack from '../common/tasks';

const mapStateToProps = state => ({
  user: state.user,
});

const CustomDrawerComponent = (props) => {
  const { user, ...rest } = props;
  const { username, group, lastSuccessfulLoginTimestamp } = user.userData;

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
        <View>
          <Text>
            Username: {username}
          </Text>
          <Text>
            Group: {group}
          </Text>
          <Text>
            Last Successful Login: {lastSuccessfulLoginTimestamp}
          </Text>
        </View>
        <DrawerItems {...rest} />
      </SafeAreaView>
    </ScrollView>
  );
};

const AdminDrawer = createDrawerNavigator({
  Jobs: {
    screen: JobStack,
  },
  Tasks: {
    screen: TaskStack,
  },
}, {
  contentComponent: connect(mapStateToProps)(CustomDrawerComponent),
});

export default AdminDrawer;
