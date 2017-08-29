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
  };

  componentWillMount() {
    this.getTasks();
  }

  getTasks = () => {
    fetch('http://localhost:8000/api/getTasks', {
      method:'GET'
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      this.setState({
        listItems:json.tasks
      })
    }.bind(this))
  };

  getFirst = () => {
    fetch('http://localhost:8000/api/getTasks', {
      method: 'GET'
    })
  }

  storeTask = () => {
    let data = new FormData();
    data.append('taskContent', this.state.inputItem);

    fetch('http://localhost:8000/api/storeTask', {
      method:'POST',
      body:data
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      let listItems = this.state.listItems;
      listItems.push(json.task);
      this.setState({
        listItems:listItems,
        inputItem:""
      })
      this.forceUpdate();
    }.bind(this))
  }

  destroyOne = (id, index) => {
    fetch('http://localhost:8000/api/destroyOne/' +id, {
      method: 'POST',
      mode:'no-cors'
    })
    .then(function() {
      let listItems = this.state.listItems;
      listItems.splice(index, 1);
      this.setState({
        listItems:listItems
      })
      this.forceUpdate();
    }.bind(this))
  }

  handleItem = (event) => {
    this.setState({
      inputItem:event.target.value
    })
  };

  handleEnter = (event) => {
    if(event.keyCode === 13)
    {
    this.storeTask();
    }
  };

  resetButton = (event) => {
    this.setState({
      listItems:[],
      inputItem:""
    })
  };

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
  };

  render() {
    return (
      <div className="container">
        <Helmet title="Home" meta={[ { name: 'description', content: 'Description of Home' }]}/>

        <div className ="inputContainer">
          <input type="text" className="todoInput" onChange={this.handleItem} onKeyDown={this.handleEnter}value={this.state.inputItem}/>
          <input type="submit" value="Stuff N Thangs" className="todoButton" onClick={this.storeTask}/>
          <input type="reset" value ="Reset List" className="resetButton" onClick={this.resetButton}/>
        </div>

        <div className="todoList">
          {this.state.listItems.map((item, index) => (
            <div className="listItem" key={index} onClick={() => this.destroyOne(item.id, index)}>
              {item.taskContent}
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
