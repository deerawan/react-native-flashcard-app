import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { primary, white } from '../utils/colors';

const styles = StyleSheet.create({
  button: {
    borderRadius: 2,
    padding: 10,
  },
  buttonText: {
    textAlign: 'center',
  },
});

const Button = ({ onPress, children, color = primary, style = {} }) => {
  const btnStyle =
    Platform.OS === 'ios'
      ? { borderColor: color, borderWidth: 2 }
      : { backgroundColor: color };
  const textStyle =
    Platform.OS === 'ios' ? { color } : { color: white, fontWeight: 'bold' };
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, btnStyle, style]}
    >
      <Text style={[styles.buttonText, textStyle]}>
        {Platform.OS === 'ios' ? children : children.toUpperCase()}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
