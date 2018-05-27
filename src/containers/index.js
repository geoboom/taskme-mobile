import { createSwitchNavigator } from 'react-navigation';

import AuthLoadingScreen from './common/auth/AuthLoadingScreen';
import AuthTabs from './common/auth/AuthTabs';
import AdminDrawer from './admin';

export default createSwitchNavigator({
  AuthLoading: {
    screen: AuthLoadingScreen,
    // navigationOptions: {
    //   header: null,
    // },
  },
  AuthTabs: {
    screen: AuthTabs,
    // navigationOptions: {
    //   header: null,
    // },
  },
  Admin: {
    screen: AdminDrawer,
    // navigationOptions: {
    //   title: 'Testing',
    // },
  },
});
