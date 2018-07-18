import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

const RemoveAssignmentModal = ({
  visible,
  onAssignmentRemove,
  modalClose,
}) => (
  <Modal
    animationType="none"
    transparent
    visible={visible}
    onRequestClose={modalClose}
  >
    <View
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          backgroundColor: 'white',
          height: 60,
          width: 200,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 5,
        }}
      >
        <TouchableOpacity
          onPress={onAssignmentRemove}
        >
          <View
            style={{
              width: 200,
              padding: 10,
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: 'black',
              }}
            >
              Remove Assignment
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

export default RemoveAssignmentModal;
