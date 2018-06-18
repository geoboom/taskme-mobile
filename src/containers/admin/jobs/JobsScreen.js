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

import { removeJob } from '../../../actions/jobActions';
import AlertToast from '../../../components/AlertToast';

const headerStyle = {
  backgroundColor: '#FFFFFF',
};

const headerTitleStyle = {
  textAlign: 'center',
};

const AddJobButton = ({ navigation }) => (
  <TouchableOpacity
    onPress={() => navigation.navigate('JobForm')}
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


const jobItem = (item, onEdit, onViewTasks, onSelect) => {
  const {
    title, description, category, component, pending,
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
              Title: {title}
            </Text>
            <Text
              style={{
                fontSize: 16,
                flexWrap: 'wrap',
              }}
            >
              Description: {description || '-'}
            </Text>
            <Text
              style={{
                fontSize: 16,
              }}
            >
              Category: {category}
            </Text>
            <Text
              style={{
                fontSize: 16,
              }}
            >
              Component: {component}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}
          >
            <TouchableOpacity
              onPress={pending ? null : onEdit}
            >
              <Icon
                name="md-create"
                size={35}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={pending ? null : onViewTasks}
            >
              <Icon
                name="md-open"
                size={35}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const renderJobs = (jobs, jobsLoading, onEdit, onViewTasks, onSelect) => (
  <View
    style={{
      flex: 1,
    }}
  >
    {
      jobsLoading
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
            jobs.length > 0
              ?
                <FlatList
                  data={jobs}
                  keyExtractor={job => job._id}
                  renderItem={({ item }) =>
                  jobItem(
                    item,
                    () => onEdit(item),
                    () => onViewTasks(item),
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
                  <Text>No jobs ;o</Text>
                </View>
            }
          </View>
    }
  </View>
);

const RemoveJobModal = ({
  visible,
  onJobRemove,
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
          onPress={onJobRemove}
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
              Remove Job
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

class JobsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle,
    headerTitleStyle,
    title: 'Jobs',
    headerLeft: <MenuButton navigation={navigation} />,
    headerRight: <AddJobButton navigation={navigation} />,
  });

  state = {
    removeJobModalVisible: false,
    jobSelected: null,
  };


  handleJobViewTasks = (job) => {
    const { navigation } = this.props;

    navigation.navigate('JobTasks', { viewedJob: job });
  };

  handleJobEdit = (job) => {
    const { navigation } = this.props;

    navigation.navigate('JobForm', { editedJob: job });
  };

  handleJobSelect = (job) => {
    // open modal
    this.setState({
      jobSelected: job,
      removeJobModalVisible: true,
    });
  };

  handleJobRemove = () => {
    const { _id } = this.state.jobSelected;
    const { dispatch } = this.props;

    dispatch(removeJob(_id));

    this.setState({
      jobSelected: null,
      removeJobModalVisible: false,
    });
  };

  render() {
    const { jobs, jobsLoading } = this.props;

    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <AlertToast />
        <RemoveJobModal
          visible={this.state.removeJobModalVisible}
          onJobRemove={this.handleJobRemove}
          modalClose={() =>
            this.setState({
              jobSelected: null,
              removeJobModalVisible: false,
            })
          }
        />
        {
          renderJobs(
            jobs,
            jobsLoading,
            this.handleJobEdit,
            this.handleJobViewTasks,
            this.handleJobSelect,
          )
        }
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { job: { jobs, jobsLoading } } = state;

  return {
    jobs: Object.keys(jobs)
      .map(id => ({
        ...jobs[id],
        _id: id,
      }))
      .filter(x => !x.deleted)
      .sort((a, b) => a.title.localeCompare(b.title)),
    jobsLoading,
  };
};

export default connect(mapStateToProps)(JobsScreen);
