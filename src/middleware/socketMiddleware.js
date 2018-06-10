import io from 'socket.io-client';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

import { alertError } from '../actions/alertActions';
import {
  connection,
  socketActionTypes,
  seqCountActionTypes,
  jobTaskActionTypes,
  userActionTypes,
} from '../constants';

const refreshAccessToken = async (accessToken, refreshToken, successCb, failureCb) => {
  const exp = accessToken ? jwtDecode(accessToken).exp : null;

  if (!exp || exp < (Date.now() / 1000) - 60) {
    // if token within 1 min of expiry
    const payload = {
      refreshToken,
    };
    try {
      const response = await axios.post(
        `${connection.SERVER_URL}/api/auth/token`,
        payload,
      );

      const newAccessToken = response.data.accessToken;
      return successCb(newAccessToken);
    } catch (e) {
      let error;
      if (e.response) {
        error = e.response.data;
      } else if (e.request) {
        error = 'Failed to connect to server.';
      } else {
        error = e;
      }

      return failureCb(error);
    }
  }
  return successCb(accessToken);
};

const setupSocket = async (store, next) => {
  const { accessToken, refreshToken } = store.getState().user;

  // check if jwt expired before connecting
  let socket;
  await refreshAccessToken(
    accessToken,
    refreshToken,
    (newAccessToken) => {
      next({
        type: userActionTypes.USER_ACCESS_TOKEN_GET_SUCCESS,
        payload: {
          accessToken: newAccessToken,
        },
      });
      socket = io(`${connection.SERVER_URL}?tok=${accessToken}`);
    },
    (error) => {
      next({
        type: userActionTypes.USER_ACCESS_TOKEN_GET_FAILURE,
        payload: {
          error,
        },
      });
      next(alertError('Could not get access token.'));
    },
  );

  if (socket) {
    const eventNames = Object.keys({
      ...jobTaskActionTypes,
      USER_GET_ALL: 'user.getAll',
      USER_GET_ALL_ERROR: 'user.getAll.error',
    });
    eventNames.forEach((eventName) => {
      const event = {
        ...jobTaskActionTypes,
        USER_GET_ALL: 'user.getAll',
        USER_GET_ALL_ERROR: 'user.getAll.error',
      }[eventName];

      socket.on(event, (payload) => {
        console.log(`${event} success`);
        next({
          type: event,
          payload: {
            ...payload,
            r: true,
          },
        });
      });

      socket.on(`${event}.error`, (payload) => {
        console.log(`${event} failure`);
        next({
          type: `${event}.error`,
          payload,
        });
        next(alertError(`${event} failed. Please try again.`));
      });
    });

    socket.on('connect', () => {
      // bootstrap application state
      socket.emit(userActionTypes.USER_GET_ALL);
      socket.emit(jobTaskActionTypes.TASK_GET_ALL);
      socket.emit(jobTaskActionTypes.TASK_GET_ASSIGNED);
      socket.emit(jobTaskActionTypes.JOB_GET_ALL);
      socket.emit(jobTaskActionTypes.JOB_CATEGORY_GET_ALL);
      socket.emit(jobTaskActionTypes.JOB_COMPONENT_GET_ALL);
    });

    socket.on('reconnect_attempt', async (attemptNumber) => {
      await refreshAccessToken(
        accessToken,
        refreshToken,
        (newAccessToken) => {
          next({
            type: userActionTypes.USER_ACCESS_TOKEN_GET_SUCCESS,
            payload: {
              accessToken: newAccessToken,
            },
          });
          socket.io.opts.query = {
            tok: newAccessToken,
          };
        },
        (error) => {
          next({
            type: userActionTypes.USER_ACCESS_TOKEN_GET_FAILURE,
            payload: {
              error,
            },
          });
          next(alertError('Could not get access token.'));
        },
      );
    });

    socket.on('error', (error) => {
      // check if TokenExpiredError and handle it
      console.log('socket.io error:', error);
      next(alertError('Error:', error.toString()));
    });

    return socket;
  }

  return null;
};

const socketMiddleware = (() => {
  let socket = null;
  let isSocketEvent;

  return store => next => async (action) => {
    switch (action.type) {
      case socketActionTypes.CONNECT:
        if (socket) {
          socket.disconnect(true);
        }
        socket = await setupSocket(store, next);
        break;
      case socketActionTypes.DISCONNECT:
        if (socket) {
          socket.disconnect(true);
        }
        socket = null;
        next({ type: userActionTypes.USER_LOGOUT });
        break;
      default:
        isSocketEvent = Object.values({
          ...jobTaskActionTypes,
          USER_GET_ALL: 'user.getAll',
          USER_GET_ALL_ERROR: 'user.getAll.error',
        }).includes(action.type);

        if (!isSocketEvent) {
          next(action);
          break;
        }

        if (!socket) {
          next(alertError('Connection error.'));
        } else {
          const payload = {
            d: action.payload,
            i: store.getState().seqCount.i,
          };
          socket.emit(action.type, payload);
          next({ type: action.type, payload });
          next({ type: seqCountActionTypes.SEQ_INCREMENT });
        }
    }
  };
})();

export default socketMiddleware;
