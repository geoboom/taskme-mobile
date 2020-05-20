import React from 'react';
import {
  View,
  TouchableNativeFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const HeaderAddButton = ({ navigation, destination, navParams = {} }) => (
  <TouchableNativeFeedback
    onPress={() => navigation.navigate(destination, navParams)}
    delayPressIn={0}
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
        name="md-add"
        size={35}
      />
    </View>
  </TouchableNativeFeedback>
);

export default HeaderAddButton;
