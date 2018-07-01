import {
  userActionTypes,
} from '../constants';

const initialState = {
  users: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userActionTypes.USER: {
      const { d, r } = action.payload;
      if (r) {
        return {
          ...state,
          users: {
            ...state.users,
            [d._id]: d,
          },
        };
      }
      break;
    }
    case userActionTypes.USER_GET_ALL: {
      const { d, r } = action.payload;
      if (r) {
        const transformed = {};
        d.forEach((user) => {
          transformed[user._id] = user;
        });

        return {
          ...state,
          users: transformed,
        };
      }
      break;
    }
    default:
      return state;
  }
};

export default userReducer;
