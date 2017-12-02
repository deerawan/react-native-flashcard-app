import React, { Component } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import DeckListItem from './DeckListItem';
import { getDecks } from '../utils/api';
import { fetchDecks } from '../actions/deck';
import { getCardsCountLabel } from '../utils/deck';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  deckLink: {
    flex: 1,
  },
});

class DeckList extends Component {
  componentDidMount() {
    this.props.fetchDecks();
  }

  render() {
    const { decks } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          data={decks}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.id}
              style={styles.deckLink}
              onPress={() =>
                this.props.navigation.navigate('DeckDetail', {
                  deckId: item.id,
                })
              }
            >
              <DeckListItem title={item.title} subTitle={item.cardCount} />
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ decks }) => {
  const decksToDisplay = Object.keys(decks).map(key => {
    return {
      id: key,
      key,
      title: decks[key].title,
      cardCount: getCardsCountLabel(decks[key]),
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
