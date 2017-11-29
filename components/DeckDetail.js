import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { getCardsCountLabel } from '../utils/deck';
import TextButton from './TextButton';
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
  },
  subTitle: {
    fontSize: 20,
    textAlign: 'center',
  },
});

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params;
    return {
      title: deckId,
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
          <TextButton
            style={{ marginBottom: 10 }}
            onPress={() =>
              this.props.navigation.navigate('CardNew', {
                deckId,
              })
            }
          >
            Add Card
          </TextButton>
          <TextButton style={{ backgroundColor: secondary }}>
            Start Quiz ({cardCount})
          </TextButton>
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
// export default DeckDetail;
