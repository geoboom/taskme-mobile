import { createSwitchNavigator } from 'react-navigation';

import AuthLoadingScreen from './common/auth/AuthLoadingScreen';
import AuthTabs from './common/auth/AuthTabs';
import AdminDrawer from './admin';
import WorkerDrawer from './worker';
import { SocketErrorScreen } from './common/error';

export default createSwitchNavigator({
  AuthLoading: {
    screen: AuthLoadingScreen,
  },
  AuthTabs: {
    screen: AuthTabs,
  },
  Admin: {
    screen: AdminDrawer,
  },
  Worker: {
    screen: WorkerDrawer,
  },
  SocketError: {
    screen: SocketErrorScreen,
  },
});
