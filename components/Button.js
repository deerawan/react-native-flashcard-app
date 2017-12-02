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

type Props = {
  onPress: Function,
  children: any,
  disabled: boolean,
  color: string,
  style: any,
};

const Button = ({
  onPress,
  children,
  disabled = false,
  color = primary,
  style = {},
}: Props) => {
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
      disabled={disabled}
    >
      <Text style={[styles.buttonText, textStyle]}>
        {Platform.OS === 'ios' ? children : children.toUpperCase()}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
