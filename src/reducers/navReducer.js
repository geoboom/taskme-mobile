import { NavigationActions } from 'react-navigation';

import AppSwitchNav from '../containers';
import { MainDrawerStandard, MainDrawerAdmin } from '../containers/mainDrawer';
import AuthTabs from '../containers/auth/AuthTabs';
import {
  authActionTypes,
  jobTaskActionTypes,
  socketActionTypes,
} from '../constants';

const initialNavState = AppSwitchNav.router.getStateForAction(AppSwitchNav.router.getActionForPathAndParams('AuthLoading'));

const navReducer = (state = initialNavState, action) => {
  let nextState;

  switch (action.type) {
    case authActionTypes.AUTH_LOCAL_SUCCESS: {
      const { group } = action;
      const locationMap = {
        ['standard']: 'MainDrawerStandard',
        ['admin']: 'MainDrawerAdmin',
      };
      nextState = AppSwitchNav.router.getStateForAction(
        AppSwitchNav.router.getActionForPathAndParams(locationMap[group]),
        state,
      );
      break;
    }
    case authActionTypes.LOGOUT:
    case authActionTypes.SIGNUP_SUCCESS:
    case authActionTypes.AUTH_LOCAL_FAILURE:
      nextState = AppSwitchNav.router.getStateForAction(
        AuthTabs.router.getActionForPathAndParams('Login'),
        state,
      );
      break;
    case socketActionTypes.ERROR:
      nextState = AppSwitchNav.router.getStateForAction(
        AppSwitchNav.router.getActionForPathAndParams('SocketError', { error: action.error }),
        state,
      );
      break;
    case jobTaskActionTypes.TASK_ADD_ASSIGNMENT:
    case jobTaskActionTypes.TASK_EDIT:
    case jobTaskActionTypes.TASK_ADD:
    case jobTaskActionTypes.JOB_EDIT:
    case jobTaskActionTypes.JOB_ADD:
      if (action.payload.r) {
        nextState = AppSwitchNav.router.getStateForAction(
          NavigationActions.back(),
          state,
        );
        break;
      }
      nextState = AppSwitchNav.router.getStateForAction(action, state);
      break;
    default:
      nextState = AppSwitchNav.router.getStateForAction(action, state);
  }

  return nextState || state;
};

export default navReducer;
