import React, { Component } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import DeckListItem from './DeckListItem';
import { getDecks } from '../utils/api';
import { fetchDecks } from '../actions/deck';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

class DeckList extends Component {
  componentDidMount() {
    this.props.fetchDecks();
  }

  render() {
    debugger;
    const { decks } = this.props;
    return (
      <View style={styles.container}>
        {decks.length > 0 &&
          decks.map(deck => (
            <DeckListItem
              key={deck.id}
              title={deck.title}
              subTitle={deck.cardCount}
            />
          ))}
      </View>
    );
  }
}

const mapStateToProps = ({ decks }) => {
  const decksToDisplay = Object.keys(decks).map(key => {
    return {
      id: key,
      title: decks[key].title,
      cardCount: `${decks[key].questions.length} cards`,
    };
  });

  return {
    decks: decksToDisplay,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchDecks: () => dispatch(fetchDecks()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckList);
