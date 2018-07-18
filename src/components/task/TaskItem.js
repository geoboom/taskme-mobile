import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Card, Divider, Button } from 'react-native-elements';
import IconFA from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

import { taskGraph } from '../../constants';

const buttonRowStyle = {
  marginTop: 15,
  padding: 0,
  flexDirection: 'row',
  justifyContent: 'flex-end',
};

const buttonTitleStyle = {
  fontSize: 10,
  fontWeight: 700,
};

const buttonStyle = {
  backgroundColor: '#6666ff',
  height: 20,
  marginRight: 5,
  borderRadius: 5,
};

const RenderTaskButtons = ({ assignmentStatus, onActivity }) => {
  if (!assignmentStatus) return null;

  switch (assignmentStatus) {
    case 'Pending accept':
      return (
        <View
          style={buttonRowStyle}
        >
          <Button
            buttonStyle={buttonStyle}
            titleStyle={buttonTitleStyle}
            containerViewStyle={{ marginLeft: 0, marginRight: 0 }}
            title="Accept"
            onPress={() => onActivity('Accept')}
          />
          <Button
            buttonStyle={buttonStyle}
            titleStyle={buttonTitleStyle}
            containerViewStyle={{ marginLeft: 0, marginRight: 0 }}
            title="Reject"
            onPress={() => onActivity('Reject')}
          />
        </View>
      );
    case 'Not started':
      return (
        <View
          style={buttonRowStyle}
        >
          <Button
            buttonStyle={buttonStyle}
            titleStyle={buttonTitleStyle}
            containerViewStyle={{ marginLeft: 0, marginRight: 0 }}
            title="Start"
            onPress={() => onActivity('Start')}
          />
          <Button
            buttonStyle={buttonStyle}
            titleStyle={buttonTitleStyle}
            containerViewStyle={{ marginLeft: 0, marginRight: 0 }}
            title="Drop"
            onPress={() => onActivity('Drop')}
          />
        </View>
      );
    case 'In progress':
      return (
        <View
          style={buttonRowStyle}
        >
          <Button
            buttonStyle={buttonStyle}
            titleStyle={buttonTitleStyle}
            containerViewStyle={{ marginLeft: 0, marginRight: 0 }}
            title="Pause"
            onPress={() => onActivity('Pause')}
          />
          <Button
            buttonStyle={buttonStyle}
            titleStyle={buttonTitleStyle}
            containerViewStyle={{ marginLeft: 0, marginRight: 0 }}
            title="Mark complete"
            onPress={() => onActivity('Mark complete')}
          />
          <Button
            buttonStyle={buttonStyle}
            titleStyle={buttonTitleStyle}
            containerViewStyle={{ marginLeft: 0, marginRight: 0 }}
            title="Drop"
            onPress={() => onActivity('Drop')}
          />
        </View>
      );
    case 'Paused':
      return (
        <View
          style={buttonRowStyle}
        >
          <Button
            buttonStyle={buttonStyle}
            titleStyle={buttonTitleStyle}
            containerViewStyle={{ marginLeft: 0, marginRight: 0 }}
            title="Resume"
            onPress={() => onActivity('Resume')}
          />
          <Button
            buttonStyle={buttonStyle}
            titleStyle={buttonTitleStyle}
            containerViewStyle={{ marginLeft: 0, marginRight: 0 }}
            title="Drop"
            onPress={() => onActivity('Drop')}
          />
        </View>
      );
    case 'Completed':
    default:
      return null;
  }
};

const {
  V_TASK_UNASSIGNED,
  V_TASK_PENDING_LEADER_ACCEPT,
  V_TASK_NOT_STARTED,
  V_TASK_IN_PROGRESS,
  V_TASK_PAUSED,
  V_TASK_COMPLETED,
} = taskGraph;

const statusIcons = {
  [V_TASK_UNASSIGNED]: <IconFA name="exclamation-circle" size={20} />,
  [V_TASK_PENDING_LEADER_ACCEPT]: <IconFA name="ellipsis-h" size={20} />,
  [V_TASK_NOT_STARTED]: <IconFA name="clock-o" size={20} />,
  [V_TASK_IN_PROGRESS]: <IconFA name="play" size={20} />,
  [V_TASK_PAUSED]: <IconFA name="pause" size={20} />,
  [V_TASK_COMPLETED]: <IconFA name="check" size={20} />,
};

const TaskItem = ({
  item: {
    title,
    description,
    type,
    dueOn,
    pending,
    status,
    completedBy,
    activeMembers,
    leaderId,
  },
  user: {
    group,
    _id,
  },
  users,
  assignmentStatus,
  onView,
  onSelect,
  onActivity,
}) => (
  <TouchableOpacity
    onLongPress={pending ? null : onSelect}
    onPress={onView}
    delayPressIn={50}
    disabled={group !== 'admin'}
  >
    <Card
      containerStyle={{
        padding: 10,
        marginTop: 5,
        marginBottom: 0,
        marginLeft: 10,
        marginRight: 10,
        ...(pending ? { backgroundColor: 'rgba(220, 220, 220, 0.3)' } : {}),
        ...(leaderId === _id ? { borderColor: 'green', borderWidth: 0.8 } : {}),
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
            justifyContent: 'space-between',
            ...(pending ? { opacity: 0.3 } : {}),
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
            }}
          >
            {title}
          </Text>
          {statusIcons[status]}
        </View>
        <View
          style={{
            marginBottom: 15,
          }}
        >
          {
            description
              ?
                <Text
                  style={{
                  fontSize: 14,
                }}
                >
                  {description}
                </Text>
              :
                <Text
                  style={{
                  fontSize: 14,
                  fontStyle: 'italic',
                }}
                >
                This task has no description.
                </Text>
          }
        </View>
        <Divider />
        <View
          style={{
            flexDirection: 'row',
            marginTop: 5,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <IconFA name="calendar" size={20} />
              <Text
                style={{
                  fontSize: 16,
                  marginLeft: 5,
                }}
              >
                {dueOn ? moment.utc(dueOn).format('DD-MM-YYYY') : '-'}
              </Text>
            </View>
            {
              completedBy
                ?
                  <View
                    style={{
                      marginTop: 5,
                      flexDirection: 'row',
                      alignItems: 'center',
                  }}
                  >
                    <IconFA name="check-square-o" size={20} />
                    <Text
                      style={{
                        fontSize: 16,
                        marginLeft: 5,
                      }}
                    >
                      {
                        completedBy === _id
                          ?
                            <Text
                              style={{
                                fontWeight: 'bold',
                              }}
                            >
                            You
                            </Text>
                          :
                            users[completedBy].username
                      }
                    </Text>
                  </View>
                :
                null
            }
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <IconFA name="user" size={20} />
              <Text
                style={{
                  fontSize: 16,
                  marginLeft: 5,
                }}
              >
                {activeMembers}
              </Text>
            </View>
          </View>
        </View>
        {group === 'standard' &&
        <RenderTaskButtons
          assignmentStatus={assignmentStatus}
          onActivity={onActivity}
        />}
      </View>
    </Card>
  </TouchableOpacity>
);

export default TaskItem;
