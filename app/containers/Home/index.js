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

  constructor() {
    super();
    this.state = {
      listItems:[],
      inputItem: ""
    }
  }

  handleItem = (event) => {
    this.setState({
      inputItem:event.target.value
    })
  };

  handleEnter = (event) => {
    if(event.keyCode === 13)
    {
    this.storeItem();
    }
  }

  resetButton = (event) => {
    this.setState({
      listItems:[],
      inputItem:""
    })
  }

  storeItem = () => {
    var listItems = this.state.listItems;
    var inputItem = this.state.inputItem;

    if (inputItem !== "") {
      listItems.push(inputItem);

      this.setState({
        listItems:listItems,
        inputItem:""
      })
    }
  };

  strikeThrough = (event) => {
    let item = event.target;
    if(item.style.textDecoration === "line-through")
    {
      item.style.textDecoration = "none";
    }
    else {
      item.style.textDecoration = "line-through";
    }
  }

  render() {
    return (
      <div className="container">
        <Helmet title="Home" meta={[ { name: 'description', content: 'Description of Home' }]}/>

        <div className ="inputContainer">
          <input type="text" className="todoInput" onChange={this.handleItem} onKeyDown={this.handleEnter}value={this.state.inputItem}/>
          <input type="submit" value="Stuff N Thangs" className="todoButton" onClick={this.storeItem}/>
          <input type="reset" value ="Reset List" className="resetButton" onClick={this.resetButton}/>
        </div>
        <div className="todoList">
          {this.state.listItems.map((item, index) => (
            <div className="listItem" key={index} onClick={this.strikeThrough}>
              {item}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

Home.contextTypes = {
  router: React.PropTypes.object
};
