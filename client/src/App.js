import React, { Component } from 'react';
import './App.css';
import Todos from './components/Todos.js';
import AddTodo from './components/AddTodo.js';
import axios from 'axios';
import Media from 'react-media';

import { Container } from '@material-ui/core';

export default class App extends Component {
	state = {
		todos : []
	};

	componentDidMount() {
		axios
			.get('/api/todos')
			.then((res) => {
				this.setState({ todos: res.data });
			})
			.catch((err) => console.log('Error in App.js: ' + err));
	}

	markComplete = (id) => {
		axios
			.put('/api/todos/' + id)
			.then((_) =>
				this.setState({
					todos : this.state.todos.map((todo) => {
						if (todo._id === id) {
							todo.completed = !todo.completed;
						}
						return todo;
					})
				})
			)
			.catch((err) => console.log("Couldn't update state: " + err));
	};

	removeTodo = (id) => {
		this.setState({
			todos : this.state.todos.map((todo) => {
				if (todo._id === id) {
					todo.animated = !todo.animated;
				}
				return todo;
			})
		});
		setTimeout((_) => {
			axios
				.delete('/api/todos/' + id)
				.then(this.setState({ todos: this.state.todos.filter((todo) => todo._id !== id) }));
		}, 1000);
	};

	addTodo = (name) => {
		axios
			.post('/api/todos', { name })
			.then((todo) =>
				this.setState({
					todos : [
						todo.data,
						...this.state.todos
					]
				})
			)
			.catch((err) => console.log("Couldn't create new todo: " + err));
	};

	render() {
		return (
			<Container>
				<AddTodo addTodo={this.addTodo} />
				<Todos todos={this.state.todos} markComplete={this.markComplete} removeTodo={this.removeTodo} />
			</Container>
		);
	}
}
