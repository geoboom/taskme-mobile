import PushNotification from 'react-native-push-notification';
import axios from 'axios';

import { authActionTypes, connection } from '../constants';
import { socketDisconnect } from './socketActions';
import { alertSuccess, alertError } from './alertActions';
import { handleError } from '../utils';
import { pushNotifications } from '../services';

// const getUser = () => (
//   async (dispatch) => {
//   }
// );

const setupPushNotifications = (refreshToken) => {
  pushNotifications.configure(refreshToken);
  PushNotification.requestPermissions();
};

export const checkRefreshToken = () => (
  (dispatch, getState) => {
    const { auth: { refreshToken, userData: { group } } } = getState();
    if (refreshToken) {
      dispatch({
        type: authActionTypes.AUTH_LOCAL_SUCCESS,
        group,
      });
      setupPushNotifications(refreshToken);
      // dispatch(getUser);
      return true;
    }

    dispatch({
      type: authActionTypes.AUTH_LOCAL_FAILURE,
    });
    return false;
  }
);

export const getAccessToken = () => (
  async (dispatch, getState) => {
    try {
      const payload = {
        refreshToken: getState().auth.refreshToken,
      };

      const { data: { accessToken } } = await axios.post(
        `${connection.SERVER_URL}/api/auth/token`,
        payload,
      );

      dispatch({
        type: authActionTypes.ACCESS_TOKEN_GET_SUCCESS,
        accessToken,
      });
      return accessToken;
    } catch (e) {
      const errorMessage = handleError(e);
      dispatch({
        type: authActionTypes.ACCESS_TOKEN_GET_FAILURE,
        errorMessage,
      });
      dispatch(alertError(`Could not get access token. Please restart the app. Error: ${errorMessage}`));
      return null;
    }
  }
);

export const signup = (username, password) => (
  async (dispatch) => {
    const payload = {
      username,
      password,
    };

    dispatch({
      type: authActionTypes.SIGNUP_REQUEST,
      payload,
    });

    try {
      const { data: { userData } } = await axios.post(
        `${connection.SERVER_URL}/api/auth/signup`,
        payload,
      );

      dispatch({
        type: authActionTypes.SIGNUP_SUCCESS,
        userData,
      });
      dispatch(alertSuccess('Sign up successful.'));
      return true;
    } catch (e) {
      const errorMessage = handleError(e);
      dispatch({
        type: authActionTypes.SIGNUP_FAILURE,
        errorMessage,
      });
      return false;
    }
  }
);

export const login = (username, password) => (
  async (dispatch) => {
    const payload = { username, password };
    dispatch({
      type: authActionTypes.LOGIN_REQUEST,
      payload,
    });

    try {
      const { data: { refreshToken, userData } } = await axios.post(
        `${connection.SERVER_URL}/api/auth/login`,
        payload,
      );
      dispatch({
        type: authActionTypes.LOGIN_SUCCESS,
        userData,
        refreshToken,
      });
      dispatch({
        type: authActionTypes.AUTH_LOCAL_SUCCESS,
        group: userData.group,
      });
      setupPushNotifications(refreshToken);

      return true;
    } catch (e) {
      const errorMessage = handleError(e);
      dispatch({
        type: authActionTypes.LOGIN_FAILURE,
        errorMessage,
      });
      return false;
    }
  }
);

export const logout = () => (
  (dispatch, getState) => {
    const { auth: { refreshToken } } = getState();
    dispatch({
      type: authActionTypes.LOGOUT,
    });
    dispatch(socketDisconnect());
    if (refreshToken) {
      const payload = {
        refreshToken,
      };
      axios.post(
        `${connection.SERVER_URL}/api/auth/logout`,
        payload,
      )
        .then(reply => console.log('logout success:', reply))
        .catch(err => console.log('logout error:', err));
    }
  }
);

