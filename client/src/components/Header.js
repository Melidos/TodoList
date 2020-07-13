import React, { Component } from 'react';

import DrawerMenu from './DrawerMenu';
import AddTodo from './AddTodo';
import { Grid } from '@material-ui/core';

export default class Header extends Component {
	render() {
		return (
			<Grid container style={{ position: 'sticky', top: '0', backgroundColor: 'white', zIndex: 10 }}>
				<Grid item>
					<DrawerMenu userLogged={this.props.userLogged} />
				</Grid>
				<Grid item xs>
					<AddTodo addTodo={this.props.addTodo} />
				</Grid>
			</Grid>
		);
	}
}
