import io from 'socket.io-client';
import jwtDecode from 'jwt-decode';

import { alertError } from '../actions/alertActions';
import {
  connection,
  socketActionTypes,
  seqCountActionTypes,
  jobTaskActionTypes,
  userActionTypes,
  notifActionTypes,
} from '../constants';
import { getAccessToken } from '../actions/authActions';
import { pushNotifications } from '../services';

const socketEvents = {
  ...jobTaskActionTypes,
  USER: 'user',
  USER_GET_ALL: 'user.getAll',
  USER_GET_ALL_ERROR: 'user.getAll.error',
};

const refreshAccessToken = async (accessToken, dispatch) => {
  const exp = accessToken ? jwtDecode(accessToken).exp : null;
  if (!exp || exp < (Date.now() / 1000) - 60) {
    return dispatch(getAccessToken());
  }
  return accessToken;
};

const setupSocket = async (store, next) => {
  const { accessToken, userData } = store.getState().auth;

  const token = await refreshAccessToken(accessToken, store.dispatch);

  const opts = {
    reconnection: false,
  };
  const socket = io(`${connection.SERVER_URL}?tok=${token}`, opts);

  if (socket) {
    Object.values(notifActionTypes).forEach((event) => {
      socket.on(event, (payload) => {
        console.log(`${event} notification`);
        const { title, message } = payload;
        pushNotifications.localNotification({
          title, message,
        });
      });
    });

    Object.values(socketEvents).forEach((event) => {
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
      if (userData.group === 'standard') {
        socket.emit(jobTaskActionTypes.TASK_GET_ASSIGNED);
      }
      if (userData.group === 'admin') {
        socket.emit(jobTaskActionTypes.TASK_GET_ALL);
        socket.emit(jobTaskActionTypes.JOB_GET_ALL);
        socket.emit(jobTaskActionTypes.JOB_CATEGORY_GET_ALL);
        socket.emit(jobTaskActionTypes.JOB_COMPONENT_GET_ALL);
      }
    });

    socket.on('error', (error) => {
      // check if TokenExpiredError and handle it
      console.log('socket.io error:', error);
      next({
        type: socketActionTypes.ERROR,
        error,
      });
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
        console.log('socketActionTypes.CONNECT');
        if (socket) {
          console.log('socket.disconnect(true)');
          socket.disconnect(true);
        }
        console.log('socket = await setupSocket(store, next)');
        socket = await setupSocket(store, next);
        break;
      case socketActionTypes.DISCONNECT:
        if (socket) {
          socket.disconnect(true);
        }
        socket = null;
        break;
      default:
        isSocketEvent = Object.values(socketEvents).includes(action.type);
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
