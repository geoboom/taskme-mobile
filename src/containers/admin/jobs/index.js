import React from 'react';
import { createStackNavigator } from 'react-navigation';
import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';

import JobsScreen from './JobsScreen';
import JobFormScreen from './JobFormScreen';
import TasksScreen from '../../common/tasks/TasksScreen';
import TaskFormScreen from '../../common/tasks/TaskFormScreen';
import AssignmentsScreen from '../../common/assignments/AssignmentsScreen';
import AssignmentFormScreen from '../../common/assignments/AssignmentFormScreen';

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

export default JobStack;
