import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { primary, white } from '../utils/colors';

const styles = StyleSheet.create({
  button: {
    backgroundColor: primary,
    borderRadius: 2,
    padding: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: white,
  },
});

const TextButton = ({ onPress, children, style = {} }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
};

export default TextButton;
