import PushNotification from 'react-native-push-notification';

const configure = () => {
  PushNotification.configure({
    onRegister(token) {
      // process token
    },
    onNotification(notification) {
      // process notification
    },
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,
    requestPermissions: true,
  });
};

const localNotification = ({ title, message }) => {
  PushNotification.localNotification({
    title,
    message,
  });
};

export {
  configure,
  localNotification,
};
