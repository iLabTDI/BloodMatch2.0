import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

export function ButtonGeneric(props) {

  const { onPress, text} = props

  return (
    <TouchableOpacity
      style = {{
        ...styles.button,
        backgroundColor: '#e087b5',
      
      }}
      onPress={ onPress }
    >
      <Text
        style = {{
          ...styles.buttonText,
          color: '#000',
        }} 
      >
        { text }
      </Text>

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    borderRadius: 10,
    marginVertical: 15,
    paddingVertical: 11,
    width: '84%',
    flexDirection: 'row',
    alignSelf:'center',
  },

  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 16,
  },

});