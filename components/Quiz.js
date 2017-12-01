import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import PercentageCircle from 'react-native-percentage-circle';
import { connect } from 'react-redux';
import { primary, secondary, darkSlateGrey } from '../utils/colors';
import { getScoreFeedback } from '../utils/quiz';
import TextButton from './TextButton';
import Button from './Button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 25,
    paddingBottom: 25,
  },
  scoreResult: {
    alignItems: 'center',
  },
  scorePercentage: {
    paddingTop: 20,
    alignItems: 'center',
  },
  scoreFeedback: {
    textAlign: 'center',
    marginTop: 15,
  },
  questionNo: {
    fontSize: 15,
  },
  question: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 20,
    textAlign: 'center',
  },
  flipCardBtn: {
    marginTop: 10,
  },
});

class Quiz extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Quiz',
    };
  };
  state = {
    questionIndex: 0,
    correctCount: 0,
    showQuestion: true,
    showResult: false,
  };
  getNewQuestionIndex = questionIndex => {
    const { questions } = this.props;
    return Math.min(questionIndex + 1, questions.length);
  };
  shouldDisplayResult = questionIndex => {
    const { questions } = this.props;
    return questionIndex === questions.length;
  };
  correct = () => {
    this.setState(state => {
      const { questionIndex } = state;
      const nextQuestionIndex = this.getNewQuestionIndex(questionIndex);
      return {
        questionIndex: nextQuestionIndex,
        correctCount: state.correctCount + 1,
        showResult: this.shouldDisplayResult(nextQuestionIndex),
      };
    });
  };
  incorrect = () => {
    this.setState(state => {
      const { questionIndex } = state;
      const nextQuestionIndex = this.getNewQuestionIndex(questionIndex);
      return {
        questionIndex: nextQuestionIndex,
        showResult: this.shouldDisplayResult(nextQuestionIndex),
      };
    });
  };
  flipCard = () => {
    this.setState(({ showQuestion }) => ({
      showQuestion: !showQuestion,
    }));
  };
  restartQuiz = () => {
    this.setState({
      questionIndex: 0,
      correctCount: 0,
      showQuestion: true,
      showResult: false,
    });
  };
  render() {
    const { questions } = this.props;
    const totalQuestion = questions.length;
    const {
      questionIndex,
      showQuestion,
      showResult,
      correctCount,
    } = this.state;
    const questionNo = questionIndex + 1;
    debugger;

    if (showResult) {
      const scorePercentage = correctCount / totalQuestion * 100;
      const scoreFeedback = getScoreFeedback(scorePercentage);
      return (
        <View style={styles.container}>
          <View style={styles.scoreResult}>
            <Text style={styles.question}>Your Score</Text>
            <View style={styles.scorePercentage}>
              <PercentageCircle
                radius={100}
                percent={scorePercentage}
                color={primary}
                borderWidth={5}
                textStyle={{ fontSize: 24, color: primary }}
              />
              <Text style={styles.scoreFeedback}>{scoreFeedback}</Text>
            </View>
          </View>
          <View>
            <Button onPress={this.restartQuiz}>Restart Quiz</Button>
            <Button
              color={secondary}
              style={{ marginTop: 10 }}
              onPress={() => this.props.navigation.goBack()}
            >
              Back to Deck
            </Button>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.questionNo}>{`${questionNo} / ${
            totalQuestion
          }`}</Text>
        </View>
        {showQuestion ? (
          <View>
            <Text style={styles.question}>
              {questions[questionIndex].question}
            </Text>
            <TextButton color={darkSlateGrey} onPress={this.flipCard}>
              Show answer
            </TextButton>
          </View>
        ) : (
          <View>
            <Text style={styles.question}>
              {questions[questionIndex].answer}
            </Text>
            <TextButton color={darkSlateGrey} onPress={this.flipCard}>
              Show question
            </TextButton>
          </View>
        )}
        <View>
          <Button color={primary} onPress={this.correct}>
            Correct
          </Button>
          <Button
            color={secondary}
            style={{ marginTop: 10 }}
            onPress={this.incorrect}
          >
            Incorrect
          </Button>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ decks }, { navigation }) => {
  const { deckId } = navigation.state.params;
  const { questions } = decks[deckId];
  return {
    questions,
  };
};

export default connect(mapStateToProps)(Quiz);
