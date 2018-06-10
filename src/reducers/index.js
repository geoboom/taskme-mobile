import {
  combineReducers,
} from 'redux';

import userReducer from './userReducer';
import navReducer from './navReducer';
import alertReducer from './alertReducer';
import jobReducer from './jobReducer';
import taskReducer from './taskReducer';
import seqCountReducer from './seqCountReducer';
import { userActionTypes } from '../constants';

export default (state, action) => {
  let finState = state;
  if (action.type === userActionTypes.USER_LOGOUT) {
    finState = undefined;
  }

  return combineReducers({
    job: jobReducer,
    task: taskReducer,
    user: userReducer,
    nav: navReducer,
    alert: alertReducer,
    seqCount: seqCountReducer,
  })(finState, action);
};
