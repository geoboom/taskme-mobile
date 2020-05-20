import { seqCountActionTypes as actionTypes } from '../constants';

const initialState = {
  i: 0,
};

const seqCountReducer = (state = initialState, action) => {
  if (action.type === actionTypes.SEQ_INCREMENT) {
    return {
      i: state.i + 1,
    };
  }

  return state;
};

export default seqCountReducer;
