import {
  combineReducers,
} from 'redux';

import userReducer from './userReducer';
import navReducer from './navReducer';
import alertReducer from './alertReducer';
import jobReducer from './jobReducer';
import taskReducer from './taskReducer';

export default combineReducers({
  job: jobReducer,
  task: taskReducer,
  user: userReducer,
  nav: navReducer,
  alert: alertReducer,
});
