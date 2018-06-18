import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  removeAssignment,
  assignmentActivity,
} from '../../../actions/taskActions';
import AlertToast from '../../../components/AlertToast';

const headerStyle = {
  backgroundColor: '#FFFFFF',
};

const headerTitleStyle = {
  textAlign: 'center',
};

const AddAssignmentButton = ({ navigation, taskId }) => (
  <TouchableOpacity
    onPress={() => navigation.navigate('AssignmentForm', { taskId })}
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

const assignmentItem = (item, onEdit, onView, onSelect) => {
  const {
    assignedTo, assignedBy, assignedOn, status, isLeader, pending,
  } = item;

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
                fontSize: 16,
                flexWrap: 'wrap',
              }}
            >
              Assigned to: {assignedTo}
            </Text>
            <Text
              style={{
                fontSize: 16,
                flexWrap: 'wrap',
              }}
            >
              Assigned by: {assignedBy}
            </Text>
            <Text
              style={{
                fontSize: 16,
                flexWrap: 'wrap',
              }}
            >
              Assigned on: {new Date(assignedOn).toLocaleString()}
            </Text>
            <Text
              style={{
                fontSize: 16,
                flexWrap: 'wrap',
              }}
            >
              Status: {status}
            </Text>
            <Text
              style={{
                fontSize: 16,
                flexWrap: 'wrap',
              }}
            >
              Is leader: {isLeader ? 'Yes' : 'No'}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}
          />
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const renderAssignments = (assignments, assignmentsLoading, onEdit, onView, onSelect, users) => (
  <View
    style={{
      flex: 1,
    }}
  >
    {
      assignmentsLoading
        ?
          <View
            style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          >
            <ActivityIndicator
              size="large"
            />
          </View>
        :
          <View
            style={{
              flex: 1,
            }}
          >
            {
            assignments.length > 0
              ?
                <FlatList
                  data={assignments}
                  keyExtractor={assn => assn.assignedTo}
                  renderItem={({ item }) =>
                    assignmentItem(
                      {
                        ...item,
                        assignedTo: users[item.assignedTo].username,
                        assignedBy: users[item.assignedBy].username,
                      },
                      () => onEdit(item),
                      () => onView(item),
                      () => onSelect(item),
                    )
                  }
                />
              :
                <View
                  style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                >
                  <Text>No assignments ;o</Text>
                </View>
          }
          </View>
    }
  </View>
);

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

class AssignmentsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    const { _id } = params.viewedTask || {};

    return ({
      headerStyle,
      headerTitleStyle,
      title: _id,
      headerRight: _id ? <AddAssignmentButton navigation={navigation} taskId={_id} /> : null,
      ..._id ? {} : {
        headerLeft: <MenuButton navigation={navigation} />,
      },
    });
  };

  state = {
    removeAssignmentModalVisible: false,
    assignmentSelected: null,
  };

  handleAssignmentViewLog = (assignment) => {
    const { navigation } = this.props;

    navigation.navigate('AssignmentLog', { viewedAssignment: assignment });
  };

  handleAssignmentSelect = (assignment) => {
    this.setState({
      assignmentSelected: assignment,
      removeAssignmentModalVisible: true,
    });
  };

  handleAssignmentEdit = (assignment) => {
    console.log('handleAssignmentEdit', assignment);
  };

  handleAssignmentRemove = () => {
    const { assignedTo } = this.state.assignmentSelected;
    const { dispatch, navigation } = this.props;
    const { _id } = navigation.getParam('viewedTask', {});

    dispatch(removeAssignment(_id, assignedTo));

    this.setState({
      assignmentSelected: null,
      removeAssignmentModalVisible: false,
    });
  };

  render() {
    const { assignmentsLoading, assignments, users } = this.props;

    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <AlertToast />
        <RemoveAssignmentModal
          visible={this.state.removeAssignmentModalVisible}
          onAssignmentRemove={this.handleAssignmentRemove}
          modalClose={() =>
            this.setState({
              assignmentSelected: null,
              removeAssignmentModalVisible: false,
            })
          }
        />
        {
          renderAssignments(
            assignments,
            assignmentsLoading,
            this.handleAssignmentEdit,
            this.handleAssignmentViewLog,
            this.handleAssignmentSelect,
            users,
          )
        }
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { user: { users }, task: { tasks } } = state;
  const { _id } = ownProps.navigation.getParam('viewedTask', {});

  return {
    users,
    assignments: tasks[_id].assignments,
  };
};

export default connect(mapStateToProps)(AssignmentsScreen);
