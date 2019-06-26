import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { getMetricMetaInfo, timeToString, getDailyRemainderMessage } from '../utils/helpers';
import StepperComponent from './Stepper';
import SliderComponent from './SliderComponent';
import DateHeader from './DateHeader';
import { Ionicons } from '@expo/vector-icons';
import { submitEntry } from '../utils/api';
import { removeEntry } from '../utils/api';
import { addEntry } from '../actions';
import { connect } from 'react-redux';
import TextButton from '../components/TextButton';
import { white, purple } from '../utils/colors';

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:20, 
    backgroundColor:white,
  }, 
  row:{
    flexDirection:'row',
    alignItems:'center',
    flex:1,
  },
  androidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center'
  }, 
  center:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    marginLeft:30,
    marginRight:30, 
  }
});

SubmitButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={styles.androidSubmitBtn}
      onPress={onPress}>
      <Text 
      style={styles.submitBtnText}> Submit </Text>
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
        <View style={styles.center}>
          <Ionicons name="md-happy"
            size={100} />
          <Text>You have already logged the information for today</Text>
          <TextButton style={{padding:10}}onPress={this.reset}>
            Reset
          </TextButton>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <DateHeader date={(new Date()).toLocaleDateString()} />
          {Object.keys(metaInfo).map((key, index) => {
            const { getIcon, type, ...rest } = metaInfo[key];
            const value = this.state[key]
            return (
              <View key={index} style={styles.row}>
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