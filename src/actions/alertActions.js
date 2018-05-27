import { alertActionTypes as actionTypes } from '../constants';

export const alertSuccess = message => ({
  type: actionTypes.SUCCESS,
  message,
});

export const alertError = message => ({
  type: actionTypes.ERROR,
  message,
});

export const alertClear = () => ({
  type: actionTypes.CLEAR,
});
