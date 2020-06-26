import React, { Component } from 'react'
import './App.css';
import Todos from './components/Todos.js';
import AddTodo from './components/AddTodo.js';
import { uuid } from 'uuidv4';
import axios from 'axios';

export default class App extends Component {
  state = {
    todos: []
  }

  componentDidMount() {
    axios.get("/api/todos")
    .then(res => {
      this.setState({todos: res.data});
    })
    .catch(err => console.log("Error in App.js: " + err));
  }
 
  markComplete = (id) => {
    axios.put("/api/todos/" + id)
      .then(_ => 
        this.setState({ todos: this.state.todos.map(todo => {
          if (todo._id === id) {
            todo.completed = !todo.completed;
          }
          return todo;
        })})
    )
      .catch(err => console.log("Couldn't update state: " + err));
  }

  removeTodo = (id) => {
    axios.delete("/api/todos/" + id)
      .then(this.setState({ todos: this.state.todos.filter(todo => todo._id !== id)}));
  }

  addTodo = (name) => {
    axios.post("/api/todos", {name})
      .then(todo =>
        this.setState(
          { todos:
            [...this.state.todos, todo.data]
          }
        )
      )
      .catch(err => console.log("Couldn't create new todo: " + err));
  }

  render() {
    return (
      <div className="App">
        <AddTodo
          addTodo={ this.addTodo }
        />
        <div className='AppContainer'>
          <Todos
            todos={this.state.todos}
            markComplete={ this.markComplete }
            removeTodo={ this.removeTodo }
          />
        </div>
      </div>
    )
  }
}