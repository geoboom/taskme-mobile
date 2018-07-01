import { generalActionTypes } from '../constants';

const initialState = {
  appState: '',
  connectionType: '',
};

const generalReducer = (state = initialState, action) => {
  switch (action.type) {
    case generalActionTypes.APP_STATE_CHANGE:
      return {
        appState: action.appState,
      };
    case generalActionTypes.NET_INFO_CHANGE:
      return {
        connectionType: action.connectionInfo.type,
      };
    default:
      return state;
  }
};

export default generalReducer;
