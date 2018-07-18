import React from 'react';
import {
  View,
  TouchableNativeFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const HeaderMenuButton = ({ navigation }) => (
  <TouchableNativeFeedback
    onPress={navigation.openDrawer}
  >
    <View
      style={{
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
      }}
    >
      <Icon
        color="white"
        name="md-menu"
        size={35}
      />
    </View>
  </TouchableNativeFeedback>
);

export default HeaderMenuButton;
