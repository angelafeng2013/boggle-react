import React, {Component} from 'react';

var CurrentWord = React.createClass({
  submitWord: function() {
    // calls the function "scoreWord" from the parent component ScoreBoard
    this.props.onClick(this.props.word);
  },
  render: function () {
    return (
      <div className="currentWord">
        <strong>Current Word:</strong> {this.props.word.toUpperCase()}
        <button className="submit" onClick={this.submitWord}>Submit Word</button>
      </div>
    )
  }
});

module.exports = CurrentWord;
