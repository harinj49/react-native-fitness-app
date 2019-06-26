import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { purple, white, gray } from '../utils/colors';


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
    },
    stepperContainers: {
        flexDirection: 'row'
    },
    androidBtn: {
        backgroundColor: purple,
        padding: 10,
        margin: 5,
        borderRadius: 2,
    }, 
    metricCounter:{
        width:120,
        justifyContent:'center',
    }
});

export default StepperComponent = ({ value, unit, step, max, onIncrement, onDecrement }) => {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.stepperContainers}>
                <TouchableOpacity
                    style={styles.androidBtn}
                    onPress={onDecrement}>
                    <FontAwesome name='minus' size={30} color={white} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.androidBtn}
                    onPress={onIncrement}>
                    <FontAwesome name='plus' size={30} color={white} />
                </TouchableOpacity>
            </View>
            <View style={styles.metricCounter}>
                <Text style={{fontSize:24, textAlign:'center'}}>{value}</Text>
                <Text style={{fontSize:18, textAlign:'center', color:gray}}>{unit}</Text>
            </View>
        </View>
    )
}