import React, { Component } from 'react'
import './App.css';
import Todos from './components/Todos.js';
import AddTodo from './components/AddTodo.js';
import { uuid } from 'uuidv4';
import axios from 'axios';

export default class App extends Component {
  state = {
    todos: [
        {
          id: uuid(),
          title: "Take out the trash",
          completed: true,
        },
        {
          id: uuid(),
          title: "Dinner with wife",
          completed: false,
        },
        {
          id: uuid(),
          title: "Metting with boss",
          completed: false,
        },
        {
          id: uuid(),
          title: "Take out the trash",
          completed: true,
        },
        {
          id: uuid(),
          title: "Dinner with wife",
          completed: false,
        },
        {
          id: uuid(),
          title: "Metting with boss",
          completed: false,
        },
        {
          id: uuid(),
          title: "Take out the trash",
          completed: true,
        },
        {
          id: uuid(),
          title: "Dinner with wife",
          completed: false,
        },
        {
          id: uuid(),
          title: "Metting with boss",
          completed: false,
        },
        {
          id: uuid(),
          title: "Take out the trash",
          completed: true,
        },
        {
          id: uuid(),
          title: "Dinner with wife",
          completed: false,
        },
        {
          id: uuid(),
          title: "Metting with boss",
          completed: false,
        },
        {
          id: uuid(),
          title: "Take out the trash",
          completed: true,
        },
        {
          id: uuid(),
          title: "Dinner with wife",
          completed: false,
        },
        {
          id: uuid(),
          title: "Metting with boss",
          completed: false,
        },
        {
          id: uuid(),
          title: "Take out the trash",
          completed: true,
        },
        {
          id: uuid(),
          title: "Dinner with wife",
          completed: false,
        },
        {
          id: uuid(),
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
          id: uuid(),
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