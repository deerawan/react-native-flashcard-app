import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { getCardsCountLabel } from '../utils/deck';
import Button from './Button';
import { secondary } from '../utils/colors';

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

class DeckDetail extends Component {
  static navigationOptions = () => {
    return {
      title: 'Deck Detail',
    };
  };
  render() {
    const { deckId } = this.props.navigation.state.params;
    const { deck, cardCount } = this.props;
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{deck && deck.title}</Text>
          <Text style={styles.subTitle}>{cardCount}</Text>
        </View>
        <View>
          <Button
            style={{ marginBottom: 10 }}
            onPress={() =>
              this.props.navigation.navigate('CardNew', {
                deckId,
              })
            }
          >
            Add Card
          </Button>
          <Button
            color={secondary}
            onPress={() =>
              this.props.navigation.navigate('Quiz', {
                deckId,
              })
            }
          >
            Start Quiz
          </Button>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ decks }, { navigation }) => {
  const { deckId } = navigation.state.params;
  const deck = decks[deckId];
  return {
    deck,
    cardCount: getCardsCountLabel(deck),
  };
};

export default connect(mapStateToProps)(DeckDetail);
