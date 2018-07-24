/* eslint-disable no-plusplus */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

import {
  HeaderAddButton,
  HeaderMenuButton,
  NavHeaderTitle,
  ExtraOptionsModal,
} from '../../components/common';
import { JobItems } from '../../components/job';
import { removeJob } from '../../actions/jobActions';
import { AlertToast, ConnectionStatusBar } from '../../components/misc';
import { taskGraph } from '../../constants';

const headerStyle = {
  backgroundColor: '#360568',
};

class JobsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle,
    headerTitle: <NavHeaderTitle
      fallback="Jobs"
    />,
    headerLeft: <HeaderMenuButton navigation={navigation} />,
    headerRight: <HeaderAddButton
      navigation={navigation}
      destination="JobForm"
    />,
  });

  state = {
    jobModalVisible: false,
    jobSelected: null,
  };

  handleJobView = (job) => {
    const { navigation } = this.props;

    navigation.navigate('JobTasks', { viewedJob: job });
  };

  handleJobSelect = (job) => {
    // open modal
    this.setState({
      jobSelected: job,
      jobModalVisible: true,
    });
  };

  handleModalClose = () => {
    this.setState({
      jobSelected: null,
      jobModalVisible: false,
    });
  };

  handleJobEdit = () => {
    const { navigation } = this.props;
    const { jobSelected } = this.state;

    this.handleModalClose();
    navigation.navigate('JobForm', { editedJob: jobSelected });
  };

  handleJobRemove = () => {
    const { _id } = this.state.jobSelected;
    const { dispatch } = this.props;

    this.handleModalClose();
    dispatch(removeJob(_id));
  };

  render() {
    const { jobs, jobsLoading, isConnected } = this.props;

    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <AlertToast />
        <ExtraOptionsModal
          visible={this.state.jobModalVisible}
          onClose={this.handleModalClose}
          options={[
            {
              name: 'Edit job',
              onPress: this.handleJobEdit,
            },
            {
              name: 'Remove job',
              onPress: this.handleJobRemove,
            },
          ]}
        />
        <JobItems
          jobs={jobs}
          jobsLoading={jobsLoading}
          onView={this.handleJobView}
          onSelect={this.handleJobSelect}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    job: {
      jobs,
      jobsLoading,
    },
    task: {
      tasks,
    },
  } = state;

  const taskArray = Object.keys(tasks)
    .map(id => ({ ...tasks[id], _id: id }))
    .filter(x => !x.deleted);

  return {
    jobs: Object.keys(jobs)
      .map((id) => {
        let totalTasks = 0;
        let completedTasks = 0;
        taskArray
          .filter(task => task.jobId === id)
          .forEach((task) => {
            if (task.status === taskGraph.V_TASK_COMPLETED) ++completedTasks;
            ++totalTasks;
          });

        return ({
          ...jobs[id],
          _id: id,
          totalTasks,
          completedTasks,
        });
      })
      .filter(x => !x.deleted)
      .sort((a, b) => a.title.localeCompare(b.title)),
    jobsLoading,
  };
};

export default connect(mapStateToProps)(JobsScreen);
