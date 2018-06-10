import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Button,
} from 'react-native';
import { Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import { removeTask, assignmentActivity } from '../../../actions/taskActions';
import AlertToast from '../../../components/AlertToast';

const headerStyle = {
  backgroundColor: '#FFFFFF',
};

const headerTitleStyle = {
  textAlign: 'center',
};

const AddTaskButton = ({ navigation, jobId }) => (
  <TouchableOpacity
    onPress={() => navigation.navigate('TaskForm', { jobId })}
  >
    <View
      style={{
          paddingRight: 10,
          paddingTop: 5,
        }}
    >
      <Icon
        name="md-add"
        size={35}
      />
    </View>
  </TouchableOpacity>
);

const MenuButton = ({ navigation }) => (
  <TouchableOpacity
    onPress={navigation.openDrawer}
  >
    <View
      style={{
        paddingLeft: 10,
        paddingTop: 5,
      }}
    >
      <Icon
        name="md-menu"
        size={35}
      />
    </View>
  </TouchableOpacity>
);

const renderTaskButtons = (assnStatus, onActivity) => {
  if (!assnStatus) return null;

  switch (assnStatus) {
    case 'Pending Accept':
      return (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Button
            title="Accept"
            onPress={() => onActivity('Accept')}
          />
          <Button
            title="Reject"
            onPress={() => onActivity('Reject')}
          />
        </View>
      );
    case 'Not Started':
      return (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Button
            title="Start"
            onPress={() => onActivity('Start')}
          />
          <Button
            title="Drop"
            onPress={() => onActivity('Drop')}
          />
        </View>
      );
    case 'In Progress':
      return (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Button
            title="Pause"
            onPress={() => onActivity('Pause')}
          />
          <Button
            title="Mark Complete"
            onPress={() => onActivity('Mark Complete')}
          />
          <Button
            title="Drop"
            onPress={() => onActivity('Drop')}
          />
        </View>
      );
    case 'Paused':
      return (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Button
            title="Resume"
            onPress={() => onActivity('Resume')}
          />
          <Button
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

const taskItem = (item, user, users, assnStatus, onEdit, onView, onSelect, onActivity) => {
  const {
    title, description, type, dueOn, pending, status, completedBy,
  } = item;
  const {
    group,
  } = user;

  return (
    <TouchableOpacity
      onLongPress={pending ? null : onSelect}
    >
      <Card
        containerStyle={{
          padding: 0,
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
            padding: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
            ...(pending ? { opacity: 0.3 } : {}),
          }}
        >
          <View
            style={{
              flex: 8,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                flexWrap: 'wrap',
              }}
            >
              Title: {title}
            </Text>
            <Text
              style={{
                fontSize: 18,
                flexWrap: 'wrap',
              }}
            >
              Description: {description || '-'}
            </Text>
            <Text
              style={{
                fontSize: 18,
                flexWrap: 'wrap',
              }}
            >
              Status: {status || '-'}
            </Text>
            <Text
              style={{
                fontSize: 18,
                flexWrap: 'wrap',
              }}
            >
              Type: {type || '-'}
            </Text>
            <Text
              style={{
                fontSize: 18,
                flexWrap: 'wrap',
              }}
            >
              Due on: {dueOn ? new Date(dueOn).toLocaleString() : '-'}
            </Text>
            <Text
              style={{
                fontSize: 18,
                flexWrap: 'wrap',
              }}
            >
              Completed By: {completedBy ? users[completedBy].username : '-'}
            </Text>
            {group === 'worker' &&
            <View
              style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                {renderTaskButtons(assnStatus, onActivity)}
              </View>
            }
          </View>
          {group === 'admin' &&
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}
          >
            <TouchableOpacity
              onPress={pending ? null : onEdit}
            >
              <Icon
                name="md-create"
                size={35}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={pending ? null : onView}
            >
              <Icon
                name="md-open"
                size={35}
              />
            </TouchableOpacity>
          </View>}
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const renderTasks =
  (tasks, tasksLoading, user, users, assnStatus, onEdit, onView, onSelect, onActivity) => (
    <View>
      {
        tasksLoading
          ?
            <ActivityIndicator />
          :
            <View>
              {
              tasks.length > 0
                ?
                  <FlatList
                    data={tasks}
                    keyExtractor={task => task._id}
                    renderItem={({ item }) =>
                    taskItem(
                      item,
                      user,
                      users,
                      assnStatus,
                      () => onEdit(item),
                      () => onView(item),
                      () => onSelect(item),
                      status => onActivity(item._id, status),
                    )
                  }
                  />
                :
                  <Text>No tasks</Text>
            }
            </View>
      }
    </View>
  );

const RemoveTaskModal = ({
  visible,
  onTaskRemove,
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
        }}
      >
        <TouchableOpacity
          onPress={onTaskRemove}
        >
          <Text
            style={{
              fontSize: 18,
            }}
          >
            Remove Task
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

class TaskScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    const { _id } = params.viewedJob || {};

    return ({
      headerStyle,
      headerTitleStyle,
      // title: _id ? _id : 'Tasks',
      title: _id || 'Tasks',
      headerRight: _id ? <AddTaskButton navigation={navigation} jobId={_id} /> : null,
      ..._id ? {} : {
        headerLeft: <MenuButton navigation={navigation} />,
      },
    });
  };

  state = {
    removeTaskModalVisible: false,
    taskSelected: null,
  };


  handleTaskViewAssignments = (task) => {
    const { navigation } = this.props;

    navigation.navigate('TaskAssignments', { viewedTask: task });
  };

  handleTaskEdit = (task) => {
    const { navigation } = this.props;

    navigation.navigate('TaskForm', { editedTask: task });
  };

  handleTaskSelect = (task) => {
    if (this.props.user.group === 'admin') {
      this.setState({
        taskSelected: task,
        removeTaskModalVisible: true,
      });
    }
  };

  handleTaskRemove = () => {
    const { _id } = this.state.taskSelected;
    const { dispatch } = this.props;

    dispatch(removeTask(_id));

    this.setState({
      taskSelected: null,
      removeTaskModalVisible: false,
    });
  };

  onActivity = (taskId, activity) => {
    const { dispatch } = this.props;

    dispatch(assignmentActivity(taskId, activity));
  };

  render() {
    const {
      tasks, tasksLoading, user, users, assnStatus,
    } = this.props;

    return (
      <View>
        <AlertToast />
        <RemoveTaskModal
          visible={this.state.removeTaskModalVisible}
          onTaskRemove={this.handleTaskRemove}
          modalClose={() =>
            this.setState({
              taskSelected: null,
              removeTaskModalVisible: false,
            })
          }
        />
        {
          renderTasks(
            tasks,
            tasksLoading,
            user,
            users,
            assnStatus,
            this.handleTaskEdit,
            this.handleTaskViewAssignments,
            this.handleTaskSelect,
            this.onActivity,
          )
        }
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { task: { tasks, tasksLoading, assignedTasks }, user: { users, userData } } = state;
  const { navigation } = ownProps;
  const viewedJob = navigation.getParam('viewedJob', {});
  const {
    _id,
  } = viewedJob;

  const {
    group,
    _id: userId,
  } = userData;

  let t;
  if (group === 'admin') {
    t = tasks;
  } else {
    t = assignedTasks;
  }

  let assnStatus = '';

  return {
    users,
    user: userData,
    tasks: Object.keys(t)
      .map(id => ({
        ...t[id],
        id,
      }))
      .filter(x => !x.softDel)
      .filter(x => (_id ? x.jobId === _id : true))
      .filter((x) => {
        if (group === 'admin') return true;
        const assn = x.assignments.find(y => y.assignedTo === userId);
        assnStatus = assn.status;

        return assn ? !assn.softDel : false;
      })
      .sort((a, b) => a.title.localeCompare(b.title)),
    tasksLoading,
    assnStatus,
  };
};

export default connect(mapStateToProps)(TaskScreen);
