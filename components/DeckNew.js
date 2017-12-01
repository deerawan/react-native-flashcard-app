import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as t from 'tcomb-form-native';
import Button from './Button';
import { saveDeck } from '../actions/deck';
import { connect } from 'react-redux';

const Form = t.form.Form;
const Deck = t.struct({
  title: t.String,
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
});

class DeckNew extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Add new deck',
    };
  };
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
    this.props.saveDeck(value.title);
    this.clearForm();
    this.toHome();
  };
  toHome = () => {
    this.props.navigation.navigate('DeckList');
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
