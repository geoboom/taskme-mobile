import React from 'react';
import { createStackNavigator } from 'react-navigation';
import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';

import JobsScreen from './JobsScreen';
import JobFormScreen from './JobFormScreen';
import TasksScreen from '../../tasks/TasksScreen';
import TaskFormScreen from '../../tasks/TaskFormScreen';
import AssignmentsScreen from '../../assignments/AssignmentsScreen';
import AssignmentFormScreen from '../../assignments/AssignmentFormScreen';

const JobStack = createStackNavigator({
  Jobs: {
    screen: JobsScreen,
  },
  JobForm: {
    screen: JobFormScreen,
  },
  JobTasks: {
    screen: TasksScreen,
  },
  TaskForm: {
    screen: TaskFormScreen,
  },
  TaskAssignments: {
    screen: AssignmentsScreen,
  },
  AssignmentForm: {
    screen: AssignmentFormScreen,
  },
}, {
  initialRouteName: 'Jobs',
  transitionConfig: getSlideFromRightTransition,
});

JobStack.navigationOptions = ({ navigation }) => {
  let drawerLockMode = 'unlocked';
  if (navigation.state.index > 0) {
    drawerLockMode = 'locked-closed';
  }

  return {
    drawerLockMode,
  };
};

export default JobStack;
