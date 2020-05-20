import io from 'socket.io-client';
import jwtDecode from 'jwt-decode';

import { alertSuccess, alertError } from '../actions/alertActions';
import {
  connection,
  generalActionTypes,
  socketActionTypes,
  seqCountActionTypes,
  jobTaskActionTypes,
  userActionTypes,
  notifActionTypes,
} from '../constants';
import { getAccessToken } from '../actions/authActions';
import { socketConnect, socketDisconnect } from '../actions/socketActions';
import { pushNotifications } from '../services';
import { timeout } from '../utils';

const socketEvents = {
  ...jobTaskActionTypes,
  USER: 'user',
  USER_GET_ALL: 'user.getAll',
  USER_GET_ALL_ERROR: 'user.getAll.error',
};

const refreshAccessToken = async (accessToken, dispatch) => {
  const exp = accessToken ? jwtDecode(accessToken).exp : null;
  if (!exp || exp < (Date.now() / 1000) + 60) {
    return dispatch(getAccessToken());
  }
  return accessToken;
};

const setupSocket = async (store, next) => {
  const { accessToken, userData } = store.getState().auth;
  const { isConnected } = store.getState().network;

  if (!isConnected) return null;

  let socket;
  const token = await refreshAccessToken(accessToken, store.dispatch);

  if (token) {
    const opts = {
      reconnection: false,
    };
    socket = io(`${connection.SERVER_URL}?tok=${token}`, opts);
  }

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
        // console.log(`${event} success`);
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
      store.dispatch(alertSuccess('Connected'));
      store.dispatch({ type: generalActionTypes.SOCKET_CONNECTED });
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

    socket.on('disconnect', () => {
      store.dispatch({ type: generalActionTypes.SOCKET_DISCONNECTED });
      const { refreshToken } = store.getState().auth;
      console.log('============ socket.io disconnected =================');
      if (refreshToken !== '') {
        console.log('dispatch(socketDisconnect())');
        store.dispatch(socketDisconnect());
        console.log('dispatch(socketConnect())');
        store.dispatch(socketConnect());
      }
    });

    socket.on('error', (error) => {
      // check if TokenExpiredError and handle it
      console.log('socket.io error:', error);
      try {
        const errorObject = JSON.parse(error);
        if (errorObject.type === 'authentication') {
          next({
            type: socketActionTypes.ERROR,
            error: errorObject.message,
          });
        }
      } catch (e) {
        console.log('not JSON:', e);
      }
    });

    return socket;
  }

  return null;
};

const socketMiddleware = (() => {
  let readyToConnect = false;
  let socket = null;
  let isConnecting = false;
  let isSocketEvent;

  return store => next => async (action) => {
    switch (action.type) {
      case socketActionTypes.CONNECT:
        readyToConnect = true;
        if (socket) {
          console.log('socket.disconnect(true)');
          socket.disconnect(true);
        }
        if (!isConnecting) {
          isConnecting = true;
          console.log('============ socket.io connect attempt =================');
          await timeout(500);
          if (readyToConnect) {
            socket = await setupSocket(store, next);
          }
          isConnecting = false;
        }
        break;
      case socketActionTypes.DISCONNECT:
        readyToConnect = false;
        console.log('socketActionTypes.DISCONNECT');
        if (socket) {
          console.log('socket.disconnect(true)');
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

        if (!socket || !socket.connected) {
          next(alertError('Could not perform action: no internet connection.'));
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
