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
} from '../../actions/taskActions';
import AlertToast from '../../components/misc/AlertToast';
import { HeaderBackButton } from '../../components/common';

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
        color="white"
        size={35}
      />
    </View>
  </TouchableOpacity>
);

const headerStyle = {
  backgroundColor: '#45598E',
};

class TaskFormScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return ({
      headerStyle,
      headerTitle: <Text style={{ color: 'white', fontSize: 18 }}>Add new assignment</Text>,
      headerLeft: <HeaderBackButton navigation={navigation} />,
      headerRight: <ConfirmButton assignmentFormSubmit={params.assignmentFormSubmit} />,
    });
  };

  constructor(props) {
    super(props);
    this.state = {
      assignedTo: props.users.length > 0 ? props.users[0]._id : '',
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
          style={{ width: 225 }}
          enabled={users.length > 0}
          selectedValue={this.state.assignedTo}
          onValueChange={assignedTo => this.setState({ assignedTo })}
        >
          {
            users.length > 0
              ?
              users.map((user) => {
                const { _id, username } = user;
                return (
                  <Picker.Item key={_id} label={username} value={_id} />
                );
              })
              :
              <Picker.Item label="-" />
          }
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

const mapStateToProps = (state, ownProps) => {
  const { user: { users }, task: { tasks, assignmentFormLoading } } = state;
  const { params: { taskId } } = ownProps.navigation.state;
  const activeMembers = [];
  tasks[taskId].assignments.forEach((a) => {
    if (!a.deleted) activeMembers.push(a.assignedTo);
  });

  return {
    formLoading: assignmentFormLoading,
    users: Object.keys(users)
      .map(id => ({
        ...users[id],
        _id: id,
      }))
      .filter(user => user.group !== 'admin' && !activeMembers.includes(user._id))
      .sort((a, b) => a.username.localeCompare(b.username)),
  };
};

export default connect(mapStateToProps)(TaskFormScreen);
