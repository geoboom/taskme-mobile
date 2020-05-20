import { generalActionTypes } from '../constants';

export const appStateChange = appState => ({
  type: generalActionTypes.APP_STATE_CHANGE,
  appState,
});

export const netInfoChange = connectionInfo => ({
  type: generalActionTypes.NET_INFO_CHANGE,
  connectionInfo,
});
