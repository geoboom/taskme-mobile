import {
  userActionTypes as actionTypes,
} from '../constants';

const initialState = {
  formClear: {
    login: false,
    signup: false,
  },
  isLoading: {
    login: false,
    signup: false,
  },
  errorMessage: {
    login: null,
    signup: null,
  },
  refreshToken: null,
  accessToken: null,
  users: {},
  userData: {
    _id: null,
    username: null,
    group: null,
    lastSuccessfulLoginTimestamp: null,
  },
};

const isLoading = (state = initialState.isLoading, action) => {
  switch (action.type) {
    case actionTypes.USER_SIGNUP_REQUEST:
      return {
        ...state,
        signup: true,
      };
    case actionTypes.USER_SIGNUP_SUCCESS:
    case actionTypes.USER_SIGNUP_FAILURE:
      return {
        ...state,
        signup: false,
      };
    case actionTypes.USER_LOGIN_REQUEST:
      return {
        ...state,
        login: true,
      };
    case actionTypes.USER_LOGIN_SUCCESS:
    case actionTypes.USER_LOGIN_FAILURE:
      return {
        ...state,
        login: false,
      };
    default:
      return state;
  }
};

const errorMessage = (state = initialState.errorMessage, action) => {
  switch (action.type) {
    case actionTypes.USER_SIGNUP_FAILURE:
      return {
        ...state,
        signup: action.payload.error,
      };
    case actionTypes.USER_LOGIN_FAILURE:
      return {
        ...state,
        login: action.payload.error,
      };
    case actionTypes.USER_SIGNUP_REQUEST:
    case actionTypes.USER_SIGNUP_SUCCESS:
      return {
        ...state,
        signup: null,
      };
    case actionTypes.USER_LOGIN_REQUEST:
    case actionTypes.USER_LOGIN_SUCCESS:
      return {
        ...state,
        login: null,
      };
    default:
      return state;
  }
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_ACCESS_TOKEN_GET_SUCCESS:
      return {
        ...state,
        accessToken: action.payload.accessToken,
      };
    case actionTypes.USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: isLoading(state.isLoading, action),
        errorMessage: errorMessage(state.errorMessage, action),
        refreshToken: action.payload.refreshToken,
        userData: { ...state.userData, ...action.payload.userData },
        formClear: {
          ...state.formClear,
          login: true,
        },
      };
    case actionTypes.USER_SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: isLoading(state.isLoading, action),
        errorMessage: errorMessage(state.errorMessage, action),
        formClear: {
          ...state.formClear,
          signup: true,
        },
      };
    case actionTypes.USER_LOGOUT:
      return initialState;
    case actionTypes.USER_GET_ALL: {
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
      return {
        ...state,
        isLoading: isLoading(state.isLoading, action),
        errorMessage: errorMessage(state.errorMessage, action),
        formClear: {
          login: false,
          signup: false,
        },
      };
  }
};

export default userReducer;
