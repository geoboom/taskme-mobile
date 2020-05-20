import { generalActionTypes } from '../constants';

const initialState = {
  socketConnection: 'disconnected',
  appState: '',
  connectionType: '',
};

const generalReducer = (state = initialState, action) => {
  switch (action.type) {
    case generalActionTypes.APP_STATE_CHANGE:
      return {
        ...state,
        appState: action.appState,
      };
    case generalActionTypes.NET_INFO_CHANGE:
      return {
        ...state,
        connectionType: action.connectionInfo.type,
      };
    case generalActionTypes.SOCKET_CONNECTING:
      return {
        ...state,
        socketConnection: 'connecting',
      };
    case generalActionTypes.SOCKET_CONNECTED:
      return {
        ...state,
        socketConnection: 'connected',
      };
    case generalActionTypes.SOCKET_DISCONNECTED:
      return {
        ...state,
        socketConnection: 'disconnected',
      };
    default:
      return state;
  }
};

export default generalReducer;
