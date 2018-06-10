import React from 'react';
import { createStackNavigator } from 'react-navigation';
import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';

import TasksScreen from './TasksScreen';
import TaskFormScreen from './TaskFormScreen';
import AssignmentsScreen from '../assignments/AssignmentsScreen';
import AssignmentFormScreen from '../assignments/AssignmentFormScreen';

const TaskStack = createStackNavigator({
  Tasks: {
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
  initialRouteName: 'Tasks',
  transitionConfig: getSlideFromRightTransition,
});

export default TaskStack;
