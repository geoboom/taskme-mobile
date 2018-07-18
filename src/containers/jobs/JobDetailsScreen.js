import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button } from 'react-native';

class JobDetailsScreen extends Component {
  // static navigationOptions

  render() {
    const { tasks } = this.props;

    return (
      tasks.map(task => (
        <View key={task._id}>
          <Text>
            Task ID: {task._id}
          </Text>
          <Text>
            Title: {task.title}
          </Text>
          <Text>
            Description: {task.description}
          </Text>
          <Text>
            Type: {task.type}
          </Text>
          <Text>
            Status: {task.status}
          </Text>
          <Text>
            Due on: {task.dueOn}
          </Text>
          <Text>
            Completed by: {task.completedBy}
          </Text>
        </View>
      ))
    );
  }
}


const mapStateToProps = (state) => {
  const { job, task } = state;
  const { viewingJobId } = job;
  const { tasks } = task;

  return {
    tasks: tasks.filter(t => t.jobId.toString() === viewingJobId.toString()),
  };
};

export default connect(mapStateToProps)(JobDetailsScreen);
