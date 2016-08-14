import React, {Component} from 'react';
import rows from './letters.json';
import CurrentWord from './currentWord';
import classNames from 'classnames';
import shuffle from './utils'

var Letter = React.createClass({
  handleClick: function () {
    if (this.props.enabled) {
      this.setState({active: !this.state.active});
      this.props.onClick(this.props.letter, this.state.active);
    }
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
          {this.props.letter.letter}
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
        var shuffledRow = shuffle(rows[randomRow]);
        for (var i =0; i < 5; i++) {
          if (shuffledRow[i] == 'q'){
            letters.push({"letter": "Qu", "key": letters.length, 'enabled': true});
          } else {
            letters.push({"letter": shuffledRow[i].toUpperCase(), "key": letters.length, 'enabled': true});
          }
        }
      }
    } while (usedDice.length < 5);
    console.log(letters);
    this.setState({letters: letters});
  },
  getInitialState: function() {
    return {letters: [], currentWord: [], currentKeys: []};
  },
  componentDidMount: function() {
    this.loadLetters();
  },
  onLetterClick: function (letter, active) {
    var key = "";
    var newCurrentWord = [];
    var newCurrentKeys = this.state.currentKeys.slice(0);
    var letterState = this.state.letters;
    var keepEnabled = []
    if (active) {
      newCurrentWord = this.state.currentWord.slice(0, -1);
      newCurrentKeys.pop()
      key = newCurrentKeys[newCurrentKeys.length-1];
    } else {
      key = letter.key
      newCurrentWord = this.state.currentWord.concat([letter.letter]);
      newCurrentKeys = newCurrentKeys.concat([key]);
    }
    this.setState({currentWord: newCurrentWord, currentKeys: newCurrentKeys})
    switch (key % 5) {
      case 0:
        keepEnabled = [key, key-4, key-5, key+1, key+5, key+6];
        break;
      case 4:
        keepEnabled = [key, key-1, key-5, key-6, key+4, key+5];
        break;
      default:
        keepEnabled = [key, key-1, key-4, key-5, key-6, key+1, key+4, key+5, key+6];
    }
    for (var i=0; i < letterState.length; i++) {
      if (keepEnabled.indexOf(letterState[i].key) != -1 && (newCurrentKeys.indexOf(letterState[i].key) == -1 || i == key)) {
        letterState[i].enabled = true;
      } else {
        letterState[i].enabled = false;
      }
    }
    this.setState({letters: letterState});
  },
  render: function() {
    var letterNodes = this.state.letters.map((letter) => {
        return (
          <Letter onClick={this.onLetterClick} letter={letter} key={letter.key} enabled={letter.enabled}>
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
