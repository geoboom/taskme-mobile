import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';

const ExtraOptionsModal = ({
  visible,
  onClose,
  options,
}) => (
  <Modal
    animationType="none"
    transparent
    visible={visible}
    onRequestClose={onClose}
  >
    <TouchableOpacity
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      activeOpacity={1}
      onPressOut={onClose}
    >
      <View
        style={{
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 5,
        }}
      >
        {
          options.map(({ name, onPress }) => (
            <TouchableNativeFeedback
              key={name}
              onPress={onPress}
            >
              <View
                style={{
                  width: 250,
                  padding: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: 'black',
                  }}
                >
                  {name}
                </Text>
              </View>
            </TouchableNativeFeedback>
          ))
        }
      </View>
    </TouchableOpacity>
  </Modal>
);

export default ExtraOptionsModal;
