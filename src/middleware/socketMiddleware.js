import io from 'socket.io-client';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

import {
  alertError,
} from '../actions/alertActions';
import {
  connection,
  socketActionTypes,
  jobTaskActionTypes,
  userActionTypes,
} from '../constants';

const refreshAccessToken = async (accessToken, refreshToken, successCb, failureCb) => {
  let exp;

  if (accessToken) {
    exp = jwtDecode(accessToken).exp;
  }

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
      socket = io(`${connection.WS_URL}?tok=${accessToken}`);
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
    const events = Object.keys(jobTaskActionTypes);
    events.forEach((event) => {
      socket.on(event, payload => next({
        type: jobTaskActionTypes[event],
        payload,
      }));
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
    });

    return socket;
  }

  return null;
};

const socketMiddleware = (() => {
  let socket = null;
  let socketEvent;

  return store => next => (action) => {
    switch (action.type) {
      case socketActionTypes.CONNECT:
        if (socket) {
          socket.disconnect(true);
        }
        socket = setupSocket(store, next);
        break;
      case socketActionTypes.DISCONNECT:
        if (socket) {
          socket.disconnect(true);
        }
        socket = null;
        break;
      default:
        socketEvent = jobTaskActionTypes[action.type];

        if (!socketEvent) {
          return next(action);
        }

        if (!socket) {
          store.dispatch({ type: socketActionTypes.CONNECT });
        }
        socket.emit(socketEvent, action.payload);
    }
    return next();
  };
})();

export default socketMiddleware;
