import { AsyncStorage } from 'react-native';
import thunk from 'redux-thunk';
import {
  applyMiddleware,
  createStore,
} from 'redux';
import {
  persistReducer,
  persistStore,
  createTransform,
} from 'redux-persist';
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';

import rootReducer from './reducers';
import { checkRefreshToken } from './actions/authActions';
import socketMiddleware from './middleware/socketMiddleware';

const navMiddleware = createReactNavigationReduxMiddleware(
  'root', state => state.nav,
);

const middleware = [thunk, navMiddleware, socketMiddleware];

const authTransform = createTransform(
  (inboundState) => {
    const { refreshToken, accessToken, userData } = inboundState;
    return { refreshToken, accessToken, userData };
  },
  outboundState => ({
    isLoading: {
      login: false,
      signup: false,
    },
    errorMessage: {
      login: '',
      signup: '',
    },
    ...outboundState,
  }),
  {
    whitelist: ['auth'],
  },
);

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'user', 'job', 'task'],
  transforms: [authTransform],
};

export const store = createStore(
  persistReducer(persistConfig, rootReducer),
  applyMiddleware(...middleware),
);

export const persistor = persistStore(store, null, () => { store.dispatch(checkRefreshToken()); });
