import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';

import {
  addTask,
  editTask,
} from '../../actions/taskActions';
import AlertToast from '../../components/misc/AlertToast';
import { HeaderBackButton } from '../../components/common';

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
    const { _id } = params.editedTask || {};

    return ({
      headerStyle,
      headerTitle: _id
        ?
          <Text
            style={{ color: 'white', fontSize: 18 }}
          >
              Editing task:{'\n'}{_id.toString()}
          </Text>
        :
          <Text
            style={{ color: 'white', fontSize: 18 }}
          >
          Add new task
          </Text>,
      headerLeft: <HeaderBackButton navigation={navigation} />,
      headerRight: <ConfirmButton taskFormSubmit={params.taskFormSubmit} />,
    });
  };

  constructor(props) {
    super(props);
    const editedTask = props.navigation.getParam('editedTask', {});

    const {
      title, description, dueOn,
    } = editedTask;

    this.state = {
      title: title || '',
      description: description || '',
      type: 'Inspection',
      dueOn: dueOn ? moment(dueOn).format('DD-MM-YYYY') : '',
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
    const formattedDueOn = moment(dueOn, 'DD-MM-YYYY').endOf('day').toDate();

    return (
      _id
        ?
        dispatch(editTask(
          _id,
          title,
          description,
          type,
          formattedDueOn,
        ))
        :
        dispatch(addTask(
          jobId,
          title,
          description,
          type,
          formattedDueOn,
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
          autoFocuj
          maxLength={30}
          style={{
            fontSize: 18,
          }}
          onChangeText={title => this.setState({ title })}
          value={this.state.title}
        />
        <Text>
          Description
        </Text>
        <TextInput
          multiline
          maxLength={160}
          numberOfLines={2}
          style={{
            fontSize: 18,
            textAlignVertical: 'top',
          }}
          onChangeText={description => this.setState({ description })}
          value={this.state.description}
        />
        <Text>
          Due on
        </Text>
        <DatePicker
          style={{
            width: 150,
          }}
          date={this.state.dueOn}
          mode="date"
          placeholder="Select date"
          format="DD-MM-YYYY"
          minDate={moment().add(1, 'days').format('DD-MM-YYYY')}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={(date) => { this.setState({ dueOn: date }); }}
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
