import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

import { TaskItems } from '../../components/task';
import { HeaderAddButton, HeaderMenuButton, HeaderBackButton, NavHeaderTitle, ExtraOptionsModal } from '../../components/common';
import AlertToast from '../../components/misc/AlertToast';
import { removeTask, assignmentActivity } from '../../actions/taskActions';
import { taskGraph } from '../../constants';

const headerStyleLevel1 = {
  backgroundColor: '#360568',
};

const headerStyleLevel2 = {
  backgroundColor: '#005580',
};

class TaskScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    const { _id, title } = params.viewedJob || {};
    const { group } = params;

    return ({
      headerStyle: _id ? headerStyleLevel2 : headerStyleLevel1,
      headerTitle: <NavHeaderTitle
        heading="Job"
        title={title}
        fallback={group === 'standard' ? 'My Tasks' : 'Tasks'}
      />,
      headerLeft: _id
        ?
          <HeaderBackButton navigation={navigation} />
        :
          <HeaderMenuButton navigation={navigation} />,
      headerRight: _id
        ?
          <HeaderAddButton
            navigation={navigation}
            destination="TaskForm"
            navParams={{ jobId: _id }}
          />
        :
        null,
    });
  };

  constructor(props) {
    super(props);

    props.navigation.setParams({ group: props.user.group });

    this.state = {
      taskModalVisible: false,
      taskSelected: null,
    };
  }

  onActivity = (taskId, activity) => {
    const { dispatch } = this.props;

    dispatch(assignmentActivity(taskId, activity));
  };

  handleTaskView = (task) => {
    const { navigation } = this.props;

    navigation.navigate('TaskAssignments', { viewedTask: task });
  };

  handleTaskSelect = (task) => {
    if (this.props.user.group === 'admin') {
      this.setState({
        taskSelected: task,
        taskModalVisible: true,
      });
    }
  };

  handleModalClose = () => {
    this.setState({
      taskSelected: null,
      taskModalVisible: false,
    });
  };

  handleTaskEdit = () => {
    const { navigation } = this.props;
    const { taskSelected } = this.state;

    this.handleModalClose();
    navigation.navigate('TaskForm', { editedTask: taskSelected });
  };

  handleTaskRemove = () => {
    const { _id } = this.state.taskSelected;
    const { dispatch } = this.props;

    this.handleModalClose();
    dispatch(removeTask(_id));
  };

  render() {
    const {
      tasks, tasksLoading, user, users,
    } = this.props;

    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <AlertToast />
        <ExtraOptionsModal
          visible={this.state.taskModalVisible}
          onClose={this.handleModalClose}
          options={[
            {
              name: 'Edit task',
              onPress: this.handleTaskEdit,
            },
            {
              name: 'Remove task',
              onPress: this.handleTaskRemove,
            },
            {
              name: 'Mark complete',
              onPress: () => {},
            },
            {
              name: 'Go to parent job',
              onPress: () => {},
            },
          ]}
        />
        {
          <TaskItems
            tasks={tasks}
            tasksLoading={tasksLoading}
            user={user}
            users={users}
            onView={this.handleTaskView}
            onSelect={this.handleTaskSelect}
            onActivity={this.onActivity}
          />
        }
      </View>
    );
  }
}

const {
  V_TASK_UNASSIGNED,
  V_TASK_PENDING_LEADER_ACCEPT,
  V_TASK_NOT_STARTED,
  V_TASK_IN_PROGRESS,
  V_TASK_PAUSED,
  V_TASK_COMPLETED,
} = taskGraph;

const statusPriorities = {
  [V_TASK_UNASSIGNED]: 1,
  [V_TASK_PENDING_LEADER_ACCEPT]: 2,
  [V_TASK_NOT_STARTED]: 3,
  [V_TASK_IN_PROGRESS]: 4,
  [V_TASK_PAUSED]: 4,
  [V_TASK_COMPLETED]: 5,
};

const sortTasks = (a, b) => {
  if (a.dueOn < b.dueOn) return -1;
  if (a.dueOn > b.dueOn) return 1;
  return statusPriorities[b.status] - statusPriorities[a.status];
};

const mapStateToProps = (state, ownProps) => {
  const {
    task: { tasks, tasksLoading },
    user: { users },
    auth: { userData },
  } = state;
  const { navigation } = ownProps;
  const viewedJob = navigation.getParam('viewedJob', {});
  const {
    _id,
  } = viewedJob;

  return {
    users,
    user: userData,
    tasks: Object.keys(tasks)
      .map((id) => {
        const leaderAssignment = tasks[id].assignments.find(a => a.isLeader);
        return ({
          ...tasks[id],
          _id: id,
          activeMembers: tasks[id].assignments.reduce((acc, curr) =>
            (curr.deleted ? acc : acc + 1), 0),
          leaderId: leaderAssignment ? leaderAssignment.assignedTo : null,
        })})
      .filter(x => !x.deleted && (_id ? x.jobId === _id : true))
      .filter((x) => {
        if (userData.group !== 'admin') {
          return x.assignments.find(y => y.assignedTo === userData._id && !y.deleted);
        }
        return true;
      })
      .sort(sortTasks),
    tasksLoading,
  };
};

export default connect(mapStateToProps)(TaskScreen);
