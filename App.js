import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { primary, white } from './utils/colors';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import reducer from './reducers';
import DeckList from './components/DeckList';
import DeckDetail from './components/DeckDetail';
import DeckNew from './components/DeckNew';
import CardNew from './components/CardNew';
import Quiz from './components/Quiz';
import AppStatusBar from './components/AppStatusBar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const middlewares = [thunk];
const store = createStore(reducer, applyMiddleware(...middlewares));

const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-bookmarks" size={30} color={tintColor} />
      ),
    },
  },
  DeckNew: {
    screen: DeckNew,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name="plus-square" size={30} color={tintColor} />
      ),
    },
  },
});

const navigationOptions = {
  navigationOptions: {
    headerTintColor: white,
    headerStyle: {
      backgroundColor: primary,
    },
  },
};
const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  DeckDetail: {
    screen: DeckDetail,
    ...navigationOptions,
  },
  CardNew: {
    screen: CardNew,
    ...navigationOptions,
  },
  Quiz: {
    screen: Quiz,
    ...navigationOptions,
  },
});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <AppStatusBar backgroundColor={primary} />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
