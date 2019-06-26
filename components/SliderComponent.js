import React from 'react';
import {View, Text, Slider, StyleSheet} from 'react-native';
import {gray} from '../utils/colors';

const styles= StyleSheet.create({
    mainContainer:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
    metricCounter:{
        width:120,
        justifyContent:'center',
    }
})
export default SliderComponent = (props) =>{
    const {value, max, step, unit, onChange} = props;
    return (
        <View style={styles.mainContainer}>
            <Slider
                style={{flex:1}}
                value={value}
                maximumValue={max}
                minimumValue={0}
                step={step}
                onValueChange={onChange}
            />
            <View style={styles.metricCounter}>
            <Text style={{fontSize:24, textAlign:'center'}}>{value}</Text>
            <Text style={{fontSize:18, textAlign:'center', color:gray}}>{unit}</Text>
            </View>
        </View>
    )
}