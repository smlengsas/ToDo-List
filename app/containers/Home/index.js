/*
 *
 * Home
 *
 */

import React from 'react';
import Helmet from 'react-helmet';

import './style.css';
import './styleM.css';

export default class Home extends React.PureComponent {
  render() {
    return (
      <div className="container">
        <Helmet title="Home" meta={[ { name: 'description', content: 'Description of Home' }]}/>

        <div className ="inputContainer">
          <input type="text" className="todoInput"/>
          <input type="submit" value="Add to List" className="todoButton"/>
        </div>

        <div className="todoList">
          <div className="listItem">
            Here is a To - Do List Item.
          </div>
        </div>
      </div>
    );
  }
}

Home.contextTypes = {
  router: React.PropTypes.object
};
