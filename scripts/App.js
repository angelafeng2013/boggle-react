import React, {Component} from 'react';
import Board from './board';
import '../style/index.css';

export default class App extends Component {
  render() {
    return (
      // Add your component markup and other subcomponent references here.
      <div className='gameRoot'>
        <div className='logo'></div>
        <Board />
      </div>
    );
  }
}
