import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import {AppLoading} from 'expo';

import { recieveEntries, addEntry } from '../actions';
import { timeToString, getDailyRemainderMessage } from '../utils/helpers';
import { fetchCalendarResults } from '../utils/api';

import DateHeader from './DateHeader';
import MetricCard from './MetricCard';
import UdaciFitnessCalendar from 'udacifitness-calendar';
import { white } from '../utils/colors';


const styles = StyleSheet.create({
	Item: {
		backgroundColor: white,
		borderRadius: 2,
		padding: 20,
		marginLeft: 10,
		marginRight: 10,
		marginTop: 17,
		justifyContent: 'center',
		shadowRadius: 3,
		shadowOpacity: 0.8,
		shadowColor: `rgba(0,0,0,0.24)`,
		shadowOffset: {
			width: 0,
			height: 3,

		}
	},
	noDataText: {
		fontSize: 20,
		paddingTop: 20,
		paddingBottom: 20,
	}
})



class History extends Component {

	state={
		ready:false
	}


	componentDidMount() {
		const { dispatch } = this.props;
		fetchCalendarResults()
			.then((entries) => dispatch(recieveEntries(entries))) // check alternate method to use dispatch
			.then(({ entries }) => {
				if (!entries[timeToString()]) {
					dispatch(addEntry({
						[timeToString()]: getDailyRemainderMessage()
					}))
				}
			})
			.then(()=>{this.setState({ready :true})})
			.catch((err) => console.log(err, "error"));
	}

	renderItem = ({ today, ...metrics }, formattedDate, key) => {
		return (
			<View style={styles.Item}>
				{
					today
						? <View>
							<DateHeader date={formattedDate} />
							<Text style={styles.noDataText}>{today}</Text>
						</View>
						: <TouchableOpacity onPress={() => { console.log("pressed") }}>
							<MetricCard metrics={metrics} date={formattedDate} />
						</TouchableOpacity>
				}
			</View>
		)
	}

	renderEmptyDate = (formattedDate) => {
		return (
			<View style={styles.Item}>
				<DateHeader date={formattedDate} />
				<Text style={styles.noDataText}>
					You din't log any data on this day!
                </Text>
			</View>
		)
	}
	render() {
		const { entries } = this.props;
		const {ready} = this.state;

		if(!ready){
			return <AppLoading />
		}
		return (
			<UdaciFitnessCalendar
				items={entries}
				renderItem={this.renderItem}
				renderEmptyDate={this.renderEmptyDate}
			/>
		);
	}
}

function mapStateToProps(entries) {
	return {
		entries
	}
}

export default connect(mapStateToProps)(History)