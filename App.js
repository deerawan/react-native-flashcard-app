import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { primary } from './utils/colors';
import reducer from './reducers';
import DeckList from './components/DeckList';
import AppStatusBar from './components/AppStatusBar';
import thunk from 'redux-thunk';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const middlewares = [thunk];
const store = createStore(reducer, applyMiddleware(...middlewares));

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <AppStatusBar backgroundColor={primary} />
          <DeckList />
        </View>
      </Provider>
    );
  }
}
