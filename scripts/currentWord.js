import React, {Component} from 'react';

var CurrentWord = React.createClass({

  render: function () {
    return (
      <div> Current Word: {this.props.word} </div>
    )
  }
});

module.exports = CurrentWord;
