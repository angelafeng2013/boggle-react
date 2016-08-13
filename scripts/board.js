import React, {Component} from 'react';
import keys from './letters.json';
import CurrentWord from './currentWord';
import classNames from 'classnames';
import shuffle from './utils'

var Letter = React.createClass({
  handleClick: function () {
    this.props.onClick(this.props.letter, this.state.active)
    this.setState({active: !this.state.active});
  },
  getInitialState: function() {
    return {active: false};
  },
  render: function () {
    var classes = classNames({
      'letters': true,
      'activeLetter': this.state.active
    });
    return (
      <div onClick={this.handleClick} className={classes}>
        <div className="text">
          {this.props.letter}
        </div>
      </div>
    )
  }
});

var Board = React.createClass({
  loadLetters: function() {
    var letters = []
    var usedDice = [];
    do {
      var randomRow = Math.floor(Math.random() * 24 + 1);
      if (usedDice.indexOf(randomRow) == -1) {
        usedDice.push(randomRow);
        var shuffledRow = shuffle(keys[randomRow]);
        for (var i =0; i < 5; i++) {
          if (shuffledRow[i] == 'q'){
            letters.push({"letter": "Qu", "key": letters.length});
          } else {
            letters.push({"letter": shuffledRow[i].toUpperCase(), "key": letters.length});
          }
        }
      }
    } while (usedDice.length < 5);
    console.log(letters);
    this.setState({letters: letters});
  },
  getInitialState: function() {
    return {letters: [], currentWord: []};
  },
  componentDidMount: function() {
    this.loadLetters();
  },
  onLetterClick: function (letter, active) {
    console.log('clicked ', letter);
    if (active) {
      console.log('active!');
      this.setState({currentWord: this.state.currentWord.slice(0, -1)})
    } else {
      this.setState({currentWord: this.state.currentWord.concat([letter])})
    }
  },
  render: function() {
    var letterNodes = this.state.letters.map((letter) => {
        return (
          <Letter onClick={this.onLetterClick} letter={letter.letter} key={letter.key}>
          </Letter>
        );
    });
    return (
      <div>
      <div className="board">
        <div className="innerBoard">
          {letterNodes}
        </div>
      </div>
      <CurrentWord word={this.state.currentWord}/>
      </div>
    )
  }
})


module.exports = Board;
