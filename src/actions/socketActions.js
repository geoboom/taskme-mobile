import {
  socketActionTypes,
} from '../constants';

export const socketConnect = () => (
  {
    type: socketActionTypes.CONNECT,
  }
);

export const socketDisconnect = () => (
  {
    type: socketActionTypes.DISCONNECT,
  }
);
