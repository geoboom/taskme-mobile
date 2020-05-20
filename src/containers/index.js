import { createSwitchNavigator } from 'react-navigation';

import AuthLoadingScreen from './auth/AuthLoadingScreen';
import AuthTabs from './auth/AuthTabs';
import { MainDrawerStandard, MainDrawerAdmin } from './mainDrawer';
import { SocketErrorScreen } from './error';

export default createSwitchNavigator({
  AuthLoading: {
    screen: AuthLoadingScreen,
  },
  AuthTabs: {
    screen: AuthTabs,
  },
  MainDrawerStandard: {
    screen: MainDrawerStandard,
  },
  MainDrawerAdmin: {
    screen: MainDrawerAdmin,
  },
  SocketError: {
    screen: SocketErrorScreen,
  },
});
