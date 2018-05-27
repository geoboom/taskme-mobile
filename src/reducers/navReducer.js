import AppSwitchNav from '../containers';
import AuthTabs from '../containers/common/auth/AuthTabs';
import JobStack from '../containers/admin/jobs';
import { userActionTypes, jobTaskActionTypes } from '../constants';

const initialNavState = AppSwitchNav.router.getStateForAction(AppSwitchNav.router.getActionForPathAndParams('AuthLoading'));

const navReducer = (state = initialNavState, action) => {
  let nextState;

  switch (action.type) {
    case jobTaskActionTypes.JOB_DETAILS_VIEW:
      nextState = AppSwitchNav.router.getStateForAction(
        JobStack.router.getActionForPathAndParams('JobDetailsScreen'),
        state,
      );
      break;
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
    case userActionTypes.USER_AUTH_SUCCESS:
    case userActionTypes.USER_LOGIN_SUCCESS:
      nextState = AppSwitchNav.router.getStateForAction(
        AppSwitchNav.router.getActionForPathAndParams('Admin'),
        state,
      );
      break;
    default:
      nextState = AppSwitchNav.router.getStateForAction(action, state);
  }

  return nextState || state;
};

export default navReducer;
