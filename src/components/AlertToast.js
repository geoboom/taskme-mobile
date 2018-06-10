import React, { Component } from 'react';
import { View, ToastAndroid } from 'react-native';
import { connect } from 'react-redux';

import { alertClear } from '../actions/alertActions';

class AlertToast extends Component {
  state = {
    type: '',
    message: '',
  };

  static getDerivedStateFromProps(props, state) {
    const { alert, dispatch } = props;
    const { type, message } = alert;

    if (!(type === state.type && message === state.message)) {
      dispatch(alertClear());
      return {
        ...state,
        type,
        message,
      };
    }

    return state;
  }

  render() {
    const { type, message } = this.state;

    return (
      <View>
        {
          type && message
            ?
            ToastAndroid.showWithGravity(
              message,
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            )
            :
            null
        }
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    alert: state.alert,
  });
};

export default connect(mapStateToProps)(AlertToast);
