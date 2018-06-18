import { NavigationActions } from 'react-navigation';

import AppSwitchNav from '../containers';
import AuthTabs from '../containers/common/auth/AuthTabs';
import JobStack from '../containers/admin/jobs';
import { userActionTypes, jobTaskActionTypes, socketActionTypes } from '../constants';

const initialNavState = AppSwitchNav.router.getStateForAction(AppSwitchNav.router.getActionForPathAndParams('AuthLoading'));

const navReducer = (state = initialNavState, action) => {
  let nextState;

  switch (action.type) {
    case userActionTypes.USER_SIGNUP_SUCCESS:
      nextState = AppSwitchNav.router.getStateForAction(
        AuthTabs.router.getActionForPathAndParams('Login'),
        state,
      );
      break;
    case userActionTypes.USER_AUTH_FAILURE:
    case userActionTypes.USER_LOGOUT:
      nextState = AppSwitchNav.router.getStateForAction(
        AppSwitchNav.router.getActionForPathAndParams('AuthTabs'),
        state,
      );
      break;
    // case userActionTypes.USER_AUTH_SUCCESS:
    case socketActionTypes.ERROR: {
      nextState = AppSwitchNav.router.getStateForAction(
        AppSwitchNav.router.getActionForPathAndParams('SocketError', { error: action.error }),
        state,
      );
      break;
    }
    case socketActionTypes.CONNECT: {
      const { group, r } = action;

      if (r) {
        if (group === 'admin') {
          nextState = AppSwitchNav.router.getStateForAction(
            AppSwitchNav.router.getActionForPathAndParams('Admin'),
            state,
          );
        } else {
          nextState = AppSwitchNav.router.getStateForAction(
            AppSwitchNav.router.getActionForPathAndParams('Worker'),
            state,
          );
        }
      }

      break;
    }
    case jobTaskActionTypes.TASK_ADD_ASSIGNMENT:
    case jobTaskActionTypes.TASK_EDIT:
    case jobTaskActionTypes.TASK_ADD:
    case jobTaskActionTypes.JOB_EDIT:
    case jobTaskActionTypes.JOB_ADD:
      if (action.payload.r) {
        // redirect to JobsScreen
        nextState = AppSwitchNav.router.getStateForAction(
          // JobStack.router.getActionForPathAndParams('Jobs'),
          NavigationActions.back(),
          state,
        );
      } else {
        nextState = AppSwitchNav.router.getStateForAction(action, state);
      }
      break;
    default:
      nextState = AppSwitchNav.router.getStateForAction(action, state);
  }

  return nextState || state;
};

export default navReducer;
