import { AsyncStorage } from 'react-native';
import thunk from 'redux-thunk';
import {
  applyMiddleware,
  createStore,
} from 'redux';
import {
  persistReducer,
  persistStore,
} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';

import rootReducer from './reducers';
import { checkRefreshToken } from './actions/authActions';
import socketMiddleware from './middleware/socketMiddleware';

const navMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav,
);

const middleware = [thunk, navMiddleware, socketMiddleware];

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['auth', 'user', 'job', 'task'],
};

export const store = createStore(
  persistReducer(persistConfig, rootReducer),
  applyMiddleware(...middleware),
);

export const persistor = persistStore(store, null, () => { store.dispatch(checkRefreshToken()); });
