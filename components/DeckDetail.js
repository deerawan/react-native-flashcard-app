import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { AppLoading } from 'expo';
import { getCardsCountLabel } from '../utils/deck';
import Button from './Button';
import { secondary } from '../utils/colors';
import { fetchDeckById } from '../actions/deck';
import {
  setLocalNotification,
  clearLocalNotification,
} from '../utils/notification';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 20,
    textAlign: 'center',
  },
});

type Props = {
  fetchDeckById: Function,
  deck: any,
  cardCountLabel: string,
  navigation: any,
};

class DeckDetail extends Component<Props> {
  static navigationOptions = () => ({
    title: 'Deck Detail',
  });
  componentDidMount() {
    const { deckId } = this.props.navigation.state.params;
    this.props.fetchDeckById(deckId);
  }

  startQuiz = (deckId: string) => {
    // user start quiz, reset local notification
    clearLocalNotification().then(setLocalNotification);

    this.props.navigation.navigate('Quiz', {
      deckId,
    });
  };

  addNewCard = (deckId: string) => {
    this.props.navigation.navigate('CardNew', {
      deckId,
    });
  };

  render() {
    const { deckId } = this.props.navigation.state.params;
    const { deck, cardCountLabel } = this.props;

    if (!deck) {
      return <AppLoading />;
    }
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{deck && deck.title}</Text>
          <Text style={styles.subTitle}>{cardCountLabel}</Text>
        </View>
        <View>
          <Button
            style={{ marginBottom: 10 }}
            onPress={() => this.addNewCard(deckId)}
          >
            Add Card
          </Button>
          {deck.questions.length > 0 && (
            <Button color={secondary} onPress={() => this.startQuiz(deckId)}>
              Start Quiz
            </Button>
          )}
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ selectedDeck }) => ({
  deck: selectedDeck,
  cardCountLabel: getCardsCountLabel(selectedDeck),
});

const mapDispatchToProps = dispatch => ({
  fetchDeckById: deckId => dispatch(fetchDeckById(deckId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckDetail);
