import React, { Component } from 'react';
import './App.css';
import Todos from './components/Todos.js';
import Header from './components/Header.js';
import axios from 'axios';

import { Container, ThemeProvider, createMuiTheme, Button } from '@material-ui/core';

export default class App extends Component {
	state = {
		todos      : [],
		userLogged : null,
		darkMode   :
			document.cookie.split(';').find((row) => row.startsWith('darkMode')) === undefined
				? false
				: document.cookie.split(';').find((row) => row.startsWith('darkMode')).split('=')[1] === 'true'
					? true
					: false
	};

	componentDidMount() {
		document.body.style.background = this.state.darkMode === true ? '#393939' : 'white';
		axios.get('/api/login/isLoggedIn').then((user) => this.setState({ userLogged: user.data })).then((_) => {
			if (this.state.userLogged) {
				console.log(this.state.userLogged + ' connected');
				axios
					.post('/api/todos/getTodos', { user: this.state.userLogged })
					.then((res) => {
						this.setState({ todos: res.data });
					})
					.catch((err) => console.log('Error in App.js: ' + err));
			}
			else {
				console.log('User not connected');
			}
		});
	}

	componentDidUpdate() {
		document.body.style.background = this.state.darkMode === true ? '#393939' : 'white';
	}

	exportToCSV = () => {
		const csvData =
			',completed,name\n' +
			this.state.todos.map((el) => el.completed + ',"' + el.name.replace(/"/gi, "'") + '"').join('\n');

		const he = document.createElement('a');
		he.href = 'data:text/csv' + encodeURI(csvData);
		he.download = 'file.csv';
		he.click();
	};

	importCSV = () => {
		const he = document.createElement('input');
		const fr = new FileReader();
		fr.onload = (_) => {
			const lines = fr.result.split('\n');
			const el = lines.slice(1).map((e) => e.split(','));
			el.forEach((element) => {
				this.addTodo(element[0], element[1].slice(1, -1));
			});
		};
		he.type = 'file';
		he.accept = '.csv';
		he.onchange = (_) => {
			const file = he.files[0];
			fr.readAsText(file);
		};
		he.click();

		console.log(he.value);
	};

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

	addTodo = (completed, name) => {
		axios
			.post('/api/todos', { completed, name, user: this.state.userLogged })
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

	setDarkMode = () => {
		document.cookie = 'darkMode=' + !this.state.darkMode;
		console.log(document.cookie);
		this.setState({ darkMode: !this.state.darkMode });
	};

	render() {
		return (
			<ThemeProvider
				theme={
					this.state.darkMode === true ? (
						createMuiTheme({ palette: { type: 'dark' } })
					) : (
						createMuiTheme({ palette: { type: 'light' } })
					)
				}
			>
				<Container>
					<Header
						addTodo={this.addTodo}
						userLogged={this.state.userLogged}
						exportToCSV={this.exportToCSV}
						importCSV={this.importCSV}
						darkMode={this.state.darkMode}
						setDarkMode={this.setDarkMode}
					/>
					<Todos
						todos={this.state.todos}
						markComplete={this.markComplete}
						removeTodo={this.removeTodo}
						darkMode={this.state.darkMode}
					/>
				</Container>
			</ThemeProvider>
		);
	}
}
