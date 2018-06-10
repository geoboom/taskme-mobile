import React from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, Button } from 'react-native';
import { createDrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation';

import { socketActionTypes } from '../../constants';
import TaskStack from '../common/tasks';
import { persistor } from '../../store';

const mapStateToProps = state => ({
  user: state.user,
});

const CustomDrawerComponent = (props) => {
  const { dispatch, user, ...rest } = props;
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
        <Button
          title="Logout"
          onPress={() => { persistor.purge(); dispatch({ type: socketActionTypes.DISCONNECT }); }}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

const WorkerDrawer = createDrawerNavigator({
  Tasks: {
    screen: TaskStack,
  },
}, {
  contentComponent: connect(mapStateToProps)(CustomDrawerComponent),
});

export default WorkerDrawer;
