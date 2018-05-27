import { alertActionTypes } from '../constants';

const initialState = {
  type: '',
  message: '',
};

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case alertActionTypes.SUCCESS:
      return {
        type: 'alert-success',
        message: action.message,
      };
    case alertActionTypes.ERROR:
      return {
        type: 'alert-error',
        message: action.message,
      };
    case alertActionTypes.CLEAR:
      return initialState;
    default:
      return state;
  }
};

export default alertReducer;
