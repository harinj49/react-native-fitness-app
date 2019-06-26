import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { purple} from '../utils/colors';

const styles = StyleSheet.create({
  reset:{
    color: purple, 
    fontSize: 25,  
  }
})
export default function TextButton ({ children, onPress, style={} }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.reset, style]}>{children}</Text>
    </TouchableOpacity>
  )
}