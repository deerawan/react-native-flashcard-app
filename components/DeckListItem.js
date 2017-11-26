import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  item: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 2,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    marginBottom: 10,
  },
  itemContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 14,
    color: 'red',
  },
});

const DeckListItem = props => {
  const { title, subTitle } = props;
  return (
    <View style={styles.item}>
      <View style={styles.itemContent}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
      </View>
    </View>
  );
};

export default DeckListItem;
