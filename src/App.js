import React, { Component } from 'react'
import './App.css';
import Todos from './components/Todos.js';
import AddTodo from './components/AddTodo.js';

export default class App extends Component {
  state = {
    todos: [
        {
            id: 1,
            title: "Take out the trash",
            completed: false,
        },
        {
            id: 2,
            title: "Dinner with wife",
            completed: false,
        },
        {
            id: 3,
            title: "Metting with boss",
            completed: false,
        }
    ]
  }
 
  markComplete = (id) => {
    this.setState({ todos: this.state.todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    })})
  }

  removeTodo = (id) => {
    this.setState({ todos: this.state.todos.filter(todo => todo.id !== id)});
  }

  addTodo = (title) => {
    this.setState(
      { todos:
        [...this.state.todos, {
          title: title,
          id: this.state.todos.reduce( (a, b) => a.id > b.id ? a.id : b.id ) + 1,
          completed: false
        }]
      }
    );
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