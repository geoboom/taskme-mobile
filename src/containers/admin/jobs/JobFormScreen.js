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

import JobCategoryAndComponentModal from './JobCategoryAndComponentModal';
import {
  addJob,
  editJob,
  addCategory,
  removeCategory,
  addComponent,
  removeComponent,
} from '../../../actions/jobActions';
import AlertToast from '../../../components/AlertToast';

const ConfirmButton = ({ jobFormSubmit }) => (
  <TouchableOpacity
    onPress={jobFormSubmit}
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

class JobFormScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    const { _id } = params.editedJob || {};

    return ({
      // title dependent on whether form state is editing or adding
      headerTitle: _id ? <Text>Editing {_id.toString()}</Text> : <Text>Add New Job</Text>,
      headerRight: <ConfirmButton jobFormSubmit={params.jobFormSubmit} />,
    });
  };

  constructor(props) {
    super(props);
    const editedJob = props.navigation.getParam('editedJob', {});
    const {
      title, description, category, component,
    } = editedJob;

    this.state = {
      title: title || '',
      description: description || '',
      category: category || '',
      component: component || '',
      modalVisible: '',
    };
  }

  componentDidMount() {
    const { navigation } = this.props;

    navigation.setParams({
      jobFormSubmit: this.jobFormSubmit,
    });
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  jobFormSubmit = () => {
    const { navigation, dispatch } = this.props;
    const {
      title, description, category, component,
    } = this.state;
    const editedJob = navigation.getParam('editedJob', {});
    const { _id } = editedJob;

    return (
      _id
        ?
        dispatch(editJob(
          _id,
          title,
          description,
          category,
          component,
        ))
        :
        dispatch(addJob(
          title,
          description,
          category,
          component,
        ))
    );
  };

  handleFieldSelect = (fieldType, v) => {
    this.setState({
      [fieldType]: v,
    }, () => this.setModalVisible(''));
  };

  handleFieldRemove = (fieldType, id, v) => {
    if (v === this.state[fieldType]) {
      this.setState({
        [fieldType]: '',
      });
    }

    if (fieldType === 'category') return this.props.dispatch(removeCategory(id));
    if (fieldType === 'component') return this.props.dispatch(removeComponent(id));
  };

  render() {
    const {
      categories, components, dispatch, formLoading,
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
          Category
        </Text>
        <TouchableOpacity
          onPress={() => { this.setModalVisible('category'); }}
        >
          <View>
            <Text
              style={{
                fontSize: 18,
                ...(
                  this.state.category ? {
                    color: 'black',
                  } : {
                      color: 'grey',
                    }
                ),
              }}
            >
              {this.state.category
                ?
                this.state.category
                :
                'Select Category'}
            </Text>
          </View>
        </TouchableOpacity>
        <JobCategoryAndComponentModal
          visible={this.state.modalVisible}
          fieldOnSelect={v => this.handleFieldSelect('category', v)}
          fieldOnRemove={(id, v) => { this.handleFieldRemove('category', id, v); }}
          fieldOnAdd={(v) => { dispatch(addCategory(v)); }}
          fieldName="Category"
          fieldType="category"
          fields={categories}
          setModalVisible={this.setModalVisible}
        />
        <Text>
          Component
        </Text>
        <TouchableOpacity
          onPress={() => { this.setModalVisible('component'); }}
        >
          <View>
            <Text
              style={{
                fontSize: 18,
                ...(
                  this.state.component ? {
                    color: 'black',
                  } : {
                    color: 'grey',
                  }
                ),
              }}
            >
              {this.state.component
                ?
                this.state.component
                :
                'Select Component'}
            </Text>
          </View>
        </TouchableOpacity>
        <JobCategoryAndComponentModal
          visible={this.state.modalVisible}
          fieldOnSelect={v => this.handleFieldSelect('component', v)}
          fieldOnRemove={(id, v) => { this.handleFieldRemove('component', id, v); }}
          fieldOnAdd={(v) => { dispatch(addComponent(v)); }}
          fieldName="Component"
          fieldType="component"
          fields={components}
          setModalVisible={this.setModalVisible}
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
  const { categories, components, jobFormLoading } = state.job;

  return {
    formLoading: jobFormLoading,
    categories: Object.keys(categories)
      .map(id => ({
        ...categories[id],
        id,
      }))
      .filter(x => !x.deleted)
      .sort((a, b) => a.category.localeCompare(b.category)),
    components: Object.keys(components)
      .map(id => ({
        ...components[id],
        id,
      }))
      .filter(x => !x.deleted)
      .sort((a, b) => a.component.localeCompare(b.component)),
  };
};

export default connect(mapStateToProps)(JobFormScreen);
