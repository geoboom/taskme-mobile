import axios from 'axios';
import PushNotification from 'react-native-push-notification';

import { connection } from '../constants';
import { store } from '../store';

const localNotification = ({ title, message }) => {
  PushNotification.localNotification({
    title,
    message,
  });
};

const configure = (refreshToken) => {
  PushNotification.configure({
    onRegister(deviceToken) {
      const payload = {
        refreshToken,
        deviceToken,
      };
      axios
        .post(
          `${connection.SERVER_URL}/api/auth/deviceToken`,
          payload,
        )
        .then(res => console.log(res.data))
        .catch(err => console.log(err));

      // dispatch action to indicate that deviceToken has been registered
      // store.dispatch(...);
      // this action will get refreshToken from getStore() and submit a
      // post request to server with said deviceToken
    },

    onNotification(notification) {
      console.log('notification received:', notification);
    },

    senderID: '336245440544',

    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },

    popInitialNotification: true,

    requestPermissions: false,
  });
};

export {
  configure,
  localNotification,
};
