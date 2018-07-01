// import axios from 'axios';
//
// import {
//   userActionTypes as actionTypes,
//   socketActionTypes,
//   connection,
// } from '../constants';
// import {
//   alertSuccess,
//   alertError,
// } from './alertActions';
//
// const userGetAccessToken = (action = null) => (
//   async (dispatch, getState) => {
//     try {
//       const payload = {
//         refreshToken: getState().user.refreshToken,
//       };
//
//       const response = await axios.post(
//         `${connection.SERVER_URL}/api/auth/token`,
//         payload,
//       );
//       const { accessToken } = response.data;
//
//       dispatch({
//         type: actionTypes.USER_ACCESS_TOKEN_GET_SUCCESS,
//         payload: {
//           accessToken,
//         },
//       });
//       if (action) {
//         dispatch(action);
//       }
//     } catch (e) {
//       let error;
//       if (e.response) {
//         error = e.response.data;
//       } else if (e.request) {
//         error = 'Failed to connect to server.';
//       } else {
//         error = e;
//       }
//
//       dispatch({
//         type: actionTypes.USER_ACCESS_TOKEN_GET_FAILURE,
//         payload: {
//           error,
//         },
//       });
//       dispatch(alertError('Could not get access token.'));
//     }
//   }
// );
//
// const userAuthSuccess = () => (
//   (dispatch, getState) => {
//     dispatch(userGetAccessToken({
//       type: socketActionTypes.CONNECT,
//     }));
//     dispatch({
//       type: actionTypes.USER_AUTH_SUCCESS,
//     });
//   }
// );
//
// const userAuthFailure = () => ({
//   type: actionTypes.USER_AUTH_FAILURE,
// });
//
// export const userAuth = () => (
//   (dispatch, getState) => {
//     const { user } = getState();
//     user.refreshToken ? dispatch(userAuthSuccess()) : dispatch(userAuthFailure());
//   }
// );
//
// export const userLogin = (username, password) => (
//   async (dispatch) => {
//     const payload = {
//       username,
//       password,
//     };
//
//     dispatch({
//       type: actionTypes.USER_LOGIN_REQUEST,
//       payload,
//     });
//
//     try {
//       const response = await axios.post(
//         `${connection.SERVER_URL}/api/auth/login`,
//         payload,
//       );
//       const { refreshToken, userData } = response.data;
//
//       dispatch({
//         type: actionTypes.USER_LOGIN_SUCCESS,
//         payload: {
//           refreshToken,
//           userData,
//         },
//       });
//       dispatch(userGetAccessToken({
//         type: socketActionTypes.CONNECT,
//       }));
//
//       return true;
//     } catch (e) {
//       let error;
//       if (e.response) {
//         error = e.response.data;
//       } else if (e.request) {
//         error = 'Failed to connect to server.';
//       } else {
//         error = e;
//       }
//
//       dispatch({
//         type: actionTypes.USER_LOGIN_FAILURE,
//         payload: {
//           error,
//         },
//       });
//       return false;
//     }
//   }
// );
//
// export const userSignup = (username, password) => (
//   async (dispatch) => {
//     const payload = {
//       username,
//       password,
//     };
//
//     dispatch({
//       type: actionTypes.USER_SIGNUP_REQUEST,
//       payload,
//     });
//
//     try {
//       const response = await axios.post(
//         `${connection.SERVER_URL}/api/auth/signup`,
//         payload,
//       );
//       const { userData } = response.data;
//       dispatch({
//         type: actionTypes.USER_SIGNUP_SUCCESS,
//         payload: {
//           userData,
//         },
//       });
//       dispatch(alertSuccess('Sign up successful.'));
//       return true;
//     } catch (e) {
//       let error;
//       if (e.response) {
//         error = e.response.data;
//       } else if (e.request) {
//         error = 'Failed to connect to server.';
//       } else {
//         error = e;
//       }
//
//       dispatch({
//         type: actionTypes.USER_SIGNUP_FAILURE,
//         payload: {
//           error,
//         },
//       });
//       return false;
//     }
//   }
// );

