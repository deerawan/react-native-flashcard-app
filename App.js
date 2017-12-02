import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { primary, white, secondary } from './utils/colors';
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
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

const TabsConfig =
  Platform.OS === 'ios'
    ? {}
    : {
        tabBarPosition: 'top',
        animationEnabled: true,
        tabBarOptions: {
          activeTintColor: white,
          style: {
            backgroundColor: primary,
          },
          indicatorStyle: {
            backgroundColor: secondary,
          },
        },
      };
const Tabs = TabNavigator(
  {
    DeckList: {
      screen: DeckList,
      navigationOptions: {
        tabBarLabel: 'Decks',
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons
            name="cards-outline"
            size={30}
            color={tintColor}
          />
        ),
      },
    },
    DeckNew: {
      screen: DeckNew,
      navigationOptions: {
        tabBarLabel: 'Add Deck',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-add" size={30} color={tintColor} />
        ),
      },
    },
  },
  TabsConfig
);

const navigationOptions = {
  headerTintColor: white,
  headerStyle: {
    backgroundColor: primary,
  },
};
const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      ...navigationOptions,
      title: 'Home',
    },
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions,
  },
  CardNew: {
    screen: CardNew,
    navigationOptions,
  },
  Quiz: {
    screen: Quiz,
    navigationOptions,
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
