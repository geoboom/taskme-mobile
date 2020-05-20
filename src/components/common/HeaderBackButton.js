import React from 'react';
import {
  View,
  TouchableNativeFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const HeaderBackButton = ({ navigation }) => (
  <TouchableNativeFeedback
    onPress={() => navigation.goBack(navigation.state.key)}
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
        name="md-arrow-back"
        size={35}
      />
    </View>
  </TouchableNativeFeedback>
);

export default HeaderBackButton;
