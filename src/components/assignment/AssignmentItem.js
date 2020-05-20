import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AssignmentItem = ({
  disabled,
  item: {
    assignedTo,
    assignedBy,
    assignedOn,
    deleted,
    status,
    isLeader,
    pending,
  },
  onEdit,
  onView,
  onSelect,
}) => (
  <TouchableOpacity
    onLongPress={pending ? null : onSelect}
    disabled={disabled || deleted}
  >
    <Card
      containerStyle={{
        padding: 10,
        marginTop: 5,
        marginBottom: 0,
        marginLeft: 10,
        marginRight: 10,
        ...(deleted ? { backgroundColor: 'rgba(220, 220, 220, 1.0)' } : {}),
        ...(pending ? { backgroundColor: 'rgba(220, 220, 220, 0.3)' } : {}),
      }}
    >
      {
        pending
        &&
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ActivityIndicator />
        </View>
      }
      <View
        style={{
          height: 25,
          flexDirection: 'row',
          justifyContent: 'space-between',
          ...(pending ? { opacity: 0.3 } : {}),
        }}
      >
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <Text
            style={{
              fontSize: 20,
            }}
          >
            {assignedTo}
          </Text>
          {
            isLeader
              ?
                <Icon name="crown" size={20} />
              :
                null
          }
        </View>
        <Text
          style={{
            fontSize: 14,
            fontStyle: 'italic',
          }}
        >
          {status}
        </Text>
      </View>
    </Card>
  </TouchableOpacity>
);

export default AssignmentItem;
