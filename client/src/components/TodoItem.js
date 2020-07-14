import React, { Component } from 'react';
import propTypes from 'prop-types';
import { TableRow, TableCell, Checkbox, Button, Fade } from '@material-ui/core';

export default class TodoItem extends Component {
	getStyle = () => {
		return {
			textDecoration : this.props.todo.completed ? 'line-through' : 'none',
			color          : this.props.todo.completed ? 'grey' : this.props.darkMode === true ? 'white' : 'black'
		};
	};

	render() {
		const { _id, name, completed, animated } = this.props.todo;
		return (
			<Fade in={animated} timeout={1000}>
				<TableRow key={_id}>
					<TableCell padding='checkbox'>
						<Checkbox
							color='default'
							onChange={this.props.markComplete.bind(this, _id)}
							checked={completed}
						/>
					</TableCell>
					<TableCell style={this.getStyle()}>{name}</TableCell>
					<TableCell>
						<Button
							color='secondary'
							style={{ float: 'right' }}
							onClick={this.props.removeTodo.bind(this, _id)}
						>
							Remove
						</Button>
					</TableCell>
				</TableRow>
			</Fade>
		);
	}
}

TodoItem.propTypes = {
	todo : propTypes.object.isRequired
};
