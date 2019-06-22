import React, { Component } from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import { getMetricMetaInfo, timeToString, getDailyRemainderMessage } from '../utils/helpers';
import StepperComponent from './Stepper';
import SliderComponent from './SliderComponent';
import DateHeader from './DateHeader';
import { Ionicons } from '@expo/vector-icons';
import {submitEntry} from '../utils/api';
import {removeEntry} from '../utils/api';
import { addEntry } from '../actions';
import { connect } from 'react-redux';
import TextButton from '../components/TextButton';



SubmitButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}>
      <Text> Submit </Text>
    </TouchableOpacity>
  )
}

class AddEntry extends Component {

  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0,
  }

  incrementMetric = (metric) => {
    const { max, step } = getMetricMetaInfo(metric);
    const count = this.state[metric] + step;
    this.setState({
      ...this.state,
      [metric]: count > max ? max : count
    });
  }

  decrementMetric = (metric) => {
    const count = this.state[metric] - getMetricMetaInfo(metric).step;
    this.setState({
      ...this.state,
      [metric]: count < 0 ? 0 : count
    })
  }

  sliderMetric = (metric, value) => {
    this.setState({
      [metric]: value,
    });
  }

  submit = () => {
    const key = timeToString();
    const entry = this.state;

    this.props.dispatch(addEntry({
      [key]: entry,
    }))


    this.setState({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0,
    });

    submitEntry(key, entry)

  }

  reset = () => {
    const key = timeToString();
    this.props.dispatch(addEntry({
      [key]: getDailyRemainderMessage(),
    }))

    removeEntry(key)
  }

  render() {
    const metaInfo = getMetricMetaInfo();
    if (this.props.alreadyLogged) {
      return (
        <View>
          <Ionicons name="ios-happy"
            size={100} />
          <Text>You have already logged the information for today</Text>
          <TextButton onPress={this.reset}>
            Reset
          </TextButton>
        </View>
      )
    }else{
      return (
        <View>
          <DateHeader date={(new Date()).toLocaleDateString()} />
          {Object.keys(metaInfo).map((key, index) => {
            const { getIcon, type, ...rest } = metaInfo[key];
            const value = this.state[key]
            return (
              <View key={index}>
                {getIcon()}
                {(type === 'slider')
                  ? <SliderComponent
                    value={value}
                    onChange={(value) => this.sliderMetric(key, value)}
                    {...rest} />
                  : <StepperComponent
                    value={value}
                    onIncrement={() => this.incrementMetric(key)}
                    onDecrement={() => this.decrementMetric(key)}
                    {...rest} />
                }
              </View>
            )
          })}
          <SubmitButton onPress={this.submit} />
        </View>
      );
    }
  }
}

function mapStateToProps(state) {
  const key = timeToString();
  return {
    alreadyLogged: state[key] && typeof state[key].today === 'undefined',
  }
}

export default connect(mapStateToProps)(AddEntry);