import React from 'react';
import {View, Text, Slider} from 'react-native';


export default SliderComponent = (props) =>{
    const {value, max, step, unit, onChange} = props;
    console.log(value, "value in slider component")
    return (
        <View>
            <Slider
                value={value}
                maximumValue={max}
                minimumValue={0}
                step={step}
                onValueChange={onChange}
            />
            <View>
            <Text>
            {value}
            {unit}
            </Text>
            </View>
        </View>
    )
}