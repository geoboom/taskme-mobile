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
  addTask,
  editTask,
} from '../../../actions/taskActions';
import AlertToast from '../../../components/AlertToast';

const ConfirmButton = ({ taskFormSubmit }) => (
  <TouchableOpacity
    onPress={taskFormSubmit}
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
    const { _id } = params.editedTask || {};

    return ({
      headerTitle: _id ? <Text>Editing {_id.toString()}</Text> : <Text>Add New Task</Text>,
      headerRight: <ConfirmButton taskFormSubmit={params.taskFormSubmit} />,
    });
  };

  constructor(props) {
    super(props);
    const editedTask = props.navigation.getParam('editedTask', {});

    const {
      title, description, type, dueOn,
    } = editedTask;

    this.state = {
      title: title || '',
      description: description || '',
      type: type || 'Inspection',
      dueOn: dueOn ? new Date(dueOn) : new Date(Date.now() + (5 * 24 * 60 * 60 * 1000)),
    };
  }

  componentDidMount() {
    const { navigation } = this.props;

    navigation.setParams({
      taskFormSubmit: this.taskFormSubmit,
    });
  }

  taskFormSubmit = () => {
    const { navigation, dispatch } = this.props;
    const {
      title, description, type, dueOn,
    } = this.state;
    const editedTask = navigation.getParam('editedTask', {});
    const jobId = navigation.getParam('jobId', null);
    const { _id } = editedTask;

    return (
      _id
        ?
        dispatch(editTask(
          _id,
          title,
          description,
          type,
          dueOn,
        ))
        :
        dispatch(addTask(
          jobId,
          title,
          description,
          type,
          dueOn,
        ))
    );
  };

  render() {
    const {
      formLoading,
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
          Title
        </Text>
        <TextInput
          autoFocus
          style={{
            fontSize: 18,
            height: 40,
          }}
          onChangeText={title => this.setState({ title })}
          value={this.state.title}
        />
        <Text>
          Description
        </Text>
        <TextInput
          multiline
          maxLength={120}
          numberOfLines={2}
          style={{
            fontSize: 18,
            textAlignVertical: 'top',
          }}
          onChangeText={description => this.setState({ description })}
          value={this.state.description}
        />
        <Text>
          Type
        </Text>
        <Picker
          selectedValue={this.state.type}
          enabled={false}
          onValueChange={type => this.setState({ type })}
        >
          <Picker.Item label="Inspection" value="Inspection" />
          <Picker.Item label="Survey" value="Survey" />
        </Picker>
        <Text>
          Due on
        </Text>
        <TextInput
          style={{
            fontSize: 18,
          }}
          editable={false}
          value={this.state.dueOn.toLocaleString()}
        />
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
  const { taskFormLoading } = state.task;

  return {
    formLoading: taskFormLoading,
  };
};

export default connect(mapStateToProps)(TaskFormScreen);