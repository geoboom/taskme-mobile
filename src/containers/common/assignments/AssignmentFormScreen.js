import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Picker,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  addAssignment,
  removeAssignment,
  promoteAssignment,
} from '../../../actions/taskActions';
import AlertToast from '../../../components/AlertToast';

const ConfirmButton = ({ assignmentFormSubmit }) => (
  <TouchableOpacity
    onPress={assignmentFormSubmit}
  >
    <View
      style={{
        paddingRight: 10,
        paddingTop: 5,
      }}
    >
      <Icon
        name="md-checkmark"
        size={35}
      />
    </View>
  </TouchableOpacity>
);

class TaskFormScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return ({
      headerTitle: <Text>Add New Assignment</Text>,
      headerRight: <ConfirmButton assignmentFormSubmit={params.assignmentFormSubmit} />,
    });
  };

  constructor(props) {
    super(props);
    this.state = {
      assignedTo: '' || props.users[0]._id,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;

    navigation.setParams({
      assignmentFormSubmit: this.assignmentFormSubmit,
    });
  }

  assignmentFormSubmit = () => {
    const { navigation, dispatch } = this.props;
    const {
      assignedTo,
    } = this.state;
    const taskId = navigation.getParam('taskId', null);

    return (dispatch(addAssignment(taskId, assignedTo)));
  };

  render() {
    const {
      users, formLoading,
    } = this.props;

    return (
      <View
        style={{
          paddingTop: 10,
          paddingRight: 10,
          paddingLeft: 10,
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <AlertToast />
        <Text>
          Assign To
        </Text>
        <Picker
          selectedValue={this.state.assignedTo}
          onValueChange={assignedTo => this.setState({ assignedTo })}
        >
          {users.map((user) => {
            const { _id, username } = user;
            return (
              <Picker.Item key={_id} label={username} value={_id} />
            );
          })}
        </Picker>
        {
          formLoading
            ?
              <ActivityIndicator />
            :
              null
        }
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { users } = state.user;
  const { taskFormLoading } = state.task;

  return {
    formLoading: taskFormLoading,
    users: Object.keys(users)
      .map(id => ({
        ...users[id],
        id,
      }))
      .filter(user => user.group !== 'admin')
      .sort((a, b) => a.username.localeCompare(b.username)),
  };
};

export default connect(mapStateToProps)(TaskFormScreen);
