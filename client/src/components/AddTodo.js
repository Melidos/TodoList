import React, { Component } from 'react';

import { TextField } from '@material-ui/core';

export default class AddTodo extends Component {
	state = {
		name : ''
	};

	render() {
		return (
			<form
				className='addForm'
				onSubmit={(e) => {
					e.preventDefault();
					this.props.addTodo(this.state.name);
					this.setState({ name: '' });
				}}
			>
				<TextField
					variant={window.innerWidth > 1280 ? 'standard' : 'outlined'}
					fullWidth={true}
					type='text'
					id='inputText'
					placeholder='Add new todo'
					value={this.state.name}
					onChange={(e) => this.setState({ name: e.target.value })}
				/>
			</form>
		);
	}
}
