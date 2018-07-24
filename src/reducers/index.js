import { combineReducers } from 'redux';
import { reducer as network } from 'react-native-offline';

import generalReducer from './generalReducer';
import authReducer from './authReducer';
import userReducer from './userReducer';
import navReducer from './navReducer';
import alertReducer from './alertReducer';
import jobReducer from './jobReducer';
import taskReducer from './taskReducer';
import seqCountReducer from './seqCountReducer';
import { authActionTypes } from '../constants';

export default (state, action) => {
  let finState = state;
  if (action.type === authActionTypes.LOGOUT) {
    finState = {
      general: state.general,
      network: state.network,
    };
  }

  return combineReducers({
    general: generalReducer,
    user: userReducer,
    auth: authReducer,
    job: jobReducer,
    task: taskReducer,
    nav: navReducer,
    alert: alertReducer,
    seqCount: seqCountReducer,
    network,
  })(finState, action);
};
