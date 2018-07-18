import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

import { HeaderAddButton, NavHeaderTitle, HeaderBackButton, ExtraOptionsModal } from '../../components/common';
import { AssignmentItems } from '../../components/assignment';
import { assignmentGraph, taskGraph } from '../../constants';
import {
  removeAssignment,
  assignmentActivity,
} from '../../actions/taskActions';
import AlertToast from '../../components/misc/AlertToast';

const headerStyle = {
  backgroundColor: '#45598E',
};

class AssignmentsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    const { _id, title, status } = params.viewedTask || {};

    return ({
      headerStyle,
      headerTitle: <NavHeaderTitle
        heading="Task"
        title={title}
        fallback="Assignments"
      />,
      headerLeft: <HeaderBackButton navigation={navigation} />,
      headerRight: _id && status !== taskGraph.V_TASK_COMPLETED
        ?
          <HeaderAddButton
            navigation={navigation}
            destination="AssignmentForm"
            navParams={{ taskId: _id }}
          />
        :
        null,
    });
  };

  state = {
    assignmentModalVisible: false,
    assignmentSelected: null,
  };

  handleAssignmentView = (assignment) => {
    const { navigation } = this.props;

    navigation.navigate('AssignmentLog', { viewedAssignment: assignment });
  };

  handleAssignmentSelect = (assignment) => {
    this.setState({
      assignmentSelected: assignment,
      assignmentModalVisible: true,
    });
  };

  handleModalClose = () => {
    this.setState({
      assignmentSelected: null,
      assignmentModalVisible: false,
    });
  };

  handleAssignmentRemove = () => {
    const { assignedTo } = this.state.assignmentSelected;
    const { dispatch, navigation } = this.props;
    const { _id } = navigation.getParam('viewedTask', {});

    this.handleModalClose();
    dispatch(removeAssignment(_id, assignedTo));
  };

  render() {
    const {
      task: { status }, assignmentsLoading, assignments, users,
    } = this.props;

    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <AlertToast />
        <ExtraOptionsModal
          visible={this.state.assignmentModalVisible}
          onClose={this.handleModalClose}
          options={[
            {
              name: 'Remove member',
              onPress: this.handleAssignmentRemove,
            },
          ]}
        />
        <AssignmentItems
          taskStatus={status}
          assignments={assignments}
          assignmentsLoading={assignmentsLoading}
          users={users}
          onView={this.handleAssignmentView}
          onSelect={this.handleAssignmentSelect}
        />
      </View>
    );
  }
}

const {
  V_PENDING_ACCEPT,
  V_NOT_STARTED,
  V_IN_PROGRESS,
  V_PAUSED,
  V_COMPLETED,
} = assignmentGraph;

const statusPriorities = {
  [V_PENDING_ACCEPT]: 1,
  [V_NOT_STARTED]: 2,
  [V_IN_PROGRESS]: 3,
  [V_PAUSED]: 4,
  [V_COMPLETED]: 5,
};

const sortAssignments = (a, b) => {
  if (a.isLeader) return -1;
  if (b.isLeader) return 1;
  if (a.deleted) return 1;
  if (b.deleted) return -1;
  return statusPriorities[b] - statusPriorities[a];
};

const mapStateToProps = (state, ownProps) => {
  const { user: { users }, task: { tasks } } = state;
  const { _id } = ownProps.navigation.getParam('viewedTask', {});
  const viewedTask = tasks[_id];

  return {
    users,
    task: viewedTask,
    assignments: viewedTask
      .assignments
      .sort(sortAssignments),
  };
};

export default connect(mapStateToProps)(AssignmentsScreen);
