import {
  authActionTypes,
} from '../constants';

const initialState = {
  isLoading: {
    login: false,
    signup: false,
  },
  errorMessage: {
    login: '',
    signup: '',
  },
  refreshToken: '',
  accessToken: '',
  userData: {
    _id: null,
    username: null,
    group: null,
    lastSuccessfulLoginTimestamp: null,
  },
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authActionTypes.LOGIN_REQUEST: {
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          login: true,
        },
      };
    }
    case authActionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          login: false,
        },
        errorMessage: {
          ...state.errorMessage,
          login: action.errorMessage,
        },
      };
    }
    case authActionTypes.LOGIN_SUCCESS: {
      const { refreshToken, userData } = action;
      return {
        ...state,
        refreshToken,
        userData,
        isLoading: initialState.isLoading,
        errorMessage: initialState.errorMessage,
      };
    }
    case authActionTypes.SIGNUP_REQUEST: {
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          signup: true,
        },
      };
    }
    case authActionTypes.SIGNUP_FAILURE: {
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          signup: false,
        },
        errorMessage: {
          ...state.errorMessage,
          signup: action.errorMessage,
        },
      };
    }
    case authActionTypes.SIGNUP_SUCCESS: {
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          signup: initialState.isLoading.signup,
        },
        errorMessage: {
          ...state.errorMessage,
          signup: initialState.errorMessage.signup,
        },
      };
    }
    default:
      return state;
  }
};

export default authReducer;
