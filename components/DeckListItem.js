import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { primary, secondary, darkSlateGrey } from '../utils/colors';

const styles = StyleSheet.create({
  item: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    marginBottom: 10,
    padding: 25,
  },
  itemContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 7,
  },
  subTitle: {
    fontSize: 14,
    color: primary,
  },
});

const itemPlatformStyle =
  Platform.OS === 'ios'
    ? {
        borderWidth: 1,
        borderColor: '#e0e0e0',
      }
    : {
        shadowColor: '#000',
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 1,
      };

const DeckListItem = props => {
  const { title, subTitle } = props;
  return (
    <View style={[styles.item, itemPlatformStyle]}>
      <View style={styles.itemContent}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
      </View>
    </View>
  );
};

export default DeckListItem;
