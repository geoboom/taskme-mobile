import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button } from 'react-native';

import { viewJobDetails } from '../../../actions/jobActions';

class JobsScreen extends Component {
  // static navigationOptions

  handleViewJob = (jobId) => {
    this.props.dispatch(viewJobDetails(jobId));
  };

  render() {
    const { user, jobs } = this.props;

    return (
      jobs.map(job => (
        <View key={job._id}>
          <Text>
            Job ID: {job._id}
          </Text>
          <Text>
            Title: {job.title}
          </Text>
          <Text>
            Description: {job.description}
          </Text>
          <Text>
            Category: {job.category}
          </Text>
          <Text>
            Component: {job.component}
          </Text>
          <Button
            title="View Details"
            onPress={() => this.handleViewJob(job._id)}
          />
        </View>
      ))
    );
  }
}

const mapStateToProps = (state) => {
  const { user, job } = state;
  const { jobs } = job;

  return {
    user,
    jobs,
  };
};

export default connect(mapStateToProps)(JobsScreen);
