import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as t from 'tcomb-form-native';
import { connect } from 'react-redux';
import TextButton from './TextButton';
import { saveCard } from '../actions/deck';

const Form = t.form.Form;
const Card = t.struct({
  question: t.String,
  answer: t.String,
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
});

class CardNew extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Add new card',
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
    const { deckId } = this.props.navigation.state.params;
    const { answer, question } = this.refs.form.getValue();
    this.props.saveCard(deckId, { answer, question });
    this.clearForm();
    this.toDeckDetail();
  };
  toDeckDetail = () => {
    const { deckId } = this.props.navigation.state.params;
    this.props.navigation.navigate('DeckDetail', { deckId });
  };
  render() {
    return (
      <View style={styles.container}>
        <Form
          ref="form"
          type={Card}
          value={this.state.value}
          onChange={this.onChange}
        />
        <TextButton onPress={this.submit}>Save</TextButton>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  saveCard: (title, card) => dispatch(saveCard(title, card)),
});

export default connect(null, mapDispatchToProps)(CardNew);
