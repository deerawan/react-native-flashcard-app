import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { primary, white, blue } from '../utils/colors';

const styles = StyleSheet.create({
  buttonText: {
    textAlign: 'center',
  },
});

const TextButton = ({ onPress, children, color = blue, style = {} }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Text style={[styles.buttonText, { color }]}>{children}</Text>
    </TouchableOpacity>
  );
};

export default TextButton;
