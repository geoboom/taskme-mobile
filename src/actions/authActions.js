import axios from 'axios';

import { authActionTypes, connection } from '../constants';
import { socketDisconnect } from './socketActions';
import { alertSuccess, alertError } from './alertActions';
import { handleError } from '../utils';

// const getUser = () => (
//   async (dispatch) => {
//   }
// );

export const checkRefreshToken = () => (
  (dispatch, getState) => {
    const { auth: { refreshToken, userData: { group } } } = getState();
    if (refreshToken) {
      dispatch({
        type: authActionTypes.AUTH_LOCAL_SUCCESS,
        group,
      });
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
      dispatch(alertError('Could not get access token.'));
      return '';
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
        refreshToken,
        userData,
      });
      dispatch({
        type: authActionTypes.AUTH_LOCAL_SUCCESS,
        group: userData.group,
      });
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
  (dispatch) => {
    dispatch(socketDisconnect());
    dispatch({
      type: authActionTypes.LOGOUT,
    });
  }
);

