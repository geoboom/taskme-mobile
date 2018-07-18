import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import { Card } from 'react-native-elements';
import NavigationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/Ionicons';

const RemoveFieldModal = ({
  visible,
  fieldType,
  onRemovePress,
  closeModal,
}) => (
  <Modal
    animationType="none"
    transparent
    visible={visible}
    onRequestClose={closeModal}
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
        }}
      >
        <TouchableOpacity
          onPress={onRemovePress}
        >
          <Text
            style={{
              fontSize: 18,
            }}
          >
            Remove {fieldType}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

const AddNewModal = ({
  visible,
  onRequestClose,
  fieldName,
  fieldToAdd,
  onChangeTextFieldToAdd,
  cancelOnPress,
  addOnPress,
}) => (
  <Modal
    animationType="none"
    transparent
    visible={visible}
    onRequestClose={onRequestClose}
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
          height: 120,
          width: 300,
          flexDirection: 'column',
          justifyContent: 'space-around',
        }}
      >
        <View>
          <TextInput
            style={{
              height: 55,
              fontSize: 18,
              margin: 10,
            }}
            autoFocus
            placeholder={fieldName}
            value={fieldToAdd}
            onChangeText={onChangeTextFieldToAdd}
          />
        </View>
        <View
          style={{
            height: 40,
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          <TouchableOpacity
            onPress={cancelOnPress}
          >
            <Text
              style={{
                fontSize: 18,
                margin: 10,
              }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={addOnPress}
          >
            <Text
              style={{
                fontSize: 18,
                margin: 10,
              }}
            >
              Add
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

const fieldItem = (item, pending, onSelect, openRemoveModal) => (
  <TouchableOpacity
    onPress={() => (pending ? null : onSelect())}
    onLongPress={() => (pending ? null : openRemoveModal())}
  >
    <Card
      style={{
          height: 45,
        }}
    >
      <Text
        style={{
          fontSize: 18,
        }}
      >
        {item}
      </Text>
    </Card>
  </TouchableOpacity>
);

const renderFields = (fields, fieldType, fieldOnSelect, toggleRemoveModal, state) => (
  <FlatList
    extraData={state}
    data={fields}
    keyExtractor={item => item._id}
    renderItem={({ item }) =>
      fieldItem(
        item[fieldType],
        item.pending,
        () => fieldOnSelect(item[fieldType]),
        () => toggleRemoveModal(item._id, item[fieldType]),
      )
    }
  />
);

class JobCategoryAndComponentModal extends Component {
  state = {
    fieldToRemove: '',
    idToRemove: null,
    removeModalVisible: false,
    modalVisible: false,
    fieldToAdd: '',
  };

  toggleRemoveModal = (id = null, v = '', removeModalVisible = true) => {
    this.setState({
      removeModalVisible,
      idToRemove: id,
      fieldToRemove: v,
    });
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    const {
      visible,
      fieldOnSelect,
      fieldOnRemove,
      fieldOnAdd,
      fieldName,
      fieldType,
      fields,
      setModalVisible,
    } = this.props;

    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={visible === fieldType}
        onRequestClose={() => { setModalVisible(''); }}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          <AddNewModal
            visible={this.state.modalVisible}
            onRequestClose={() => { this.setModalVisible(false); }}
            fieldName={fieldName}
            fieldToAdd={this.state.fieldToAdd}
            onChangeTextFieldToAdd={fieldToAdd => this.setState({ fieldToAdd })}
            cancelOnPress={() => { this.setModalVisible(false); }}
            addOnPress={() => {
              fieldOnAdd(this.state.fieldToAdd);
              this.setState({ fieldToAdd: '' });
              this.setModalVisible(false);
            }}
          />
          <RemoveFieldModal
            visible={this.state.removeModalVisible}
            fieldType={fieldType}
            onRemovePress={() => {
              fieldOnRemove(this.state.idToRemove, this.state.fieldToRemove);
              this.toggleRemoveModal(null, '', false);
            }}
            closeModal={() => this.toggleRemoveModal(null, '', false)}
          />
          <NavigationBar
            title={{
              title: fieldName,
            }}
            leftButton={
              <TouchableOpacity
                onPress={() => { setModalVisible(''); }}
              >
                <View
                  style={{
                    paddingLeft: 10,
                    paddingTop: 5,
                  }}
                >
                  <Icon
                    name="md-close"
                    size={35}
                  />
                </View>
              </TouchableOpacity>}
            rightButton={
              <TouchableOpacity
                onPress={() => { this.setModalVisible(true); }}
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
              </TouchableOpacity>}
          />
          <View>
            {renderFields(fields, fieldType, fieldOnSelect, this.toggleRemoveModal, this.state)}
          </View>
        </View>
      </Modal>
    );
  }
}

export default JobCategoryAndComponentModal;
