import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import * as t from 'tcomb-form-native';
import { connect } from 'react-redux';
import Button from './Button';
import { saveDeck } from '../actions/deck';

const { Form } = t.form;
const Deck = t.struct({
  title: t.String,
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
});

type Props = {
  saveDeck: Function,
  navigation: any,
};

class DeckNew extends Component<Props> {
  static navigationOptions = () => ({
    title: 'Add new deck',
  });
  state = {
    value: null,
  };
  onChange = value => {
    this.setState({ value });
  };
  clearForm = () => {
    this.setState({ value: null });
  };
  submit = () => {
    const value = this.refs.form.getValue();
    this.props.saveDeck(value.title).then(() => {
      this.clearForm();
      this.toHome(value.title);
    });
  };
  toHome = (deckTitle: string) => {
    this.props.navigation.navigate('DeckDetail', { deckId: deckTitle });
  };
  render() {
    return (
      <View style={styles.container}>
        <Form
          ref="form"
          type={Deck}
          value={this.state.value}
          onChange={this.onChange}
        />
        <Button onPress={this.submit}>Save</Button>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  saveDeck: (title: string) => dispatch(saveDeck(title)),
});

export default connect(null, mapDispatchToProps)(DeckNew);
