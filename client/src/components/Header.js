import React, { Component } from 'react';

import DrawerMenu from './DrawerMenu';
import AddTodo from './AddTodo';
import { Grid } from '@material-ui/core';

export default class Header extends Component {
	getStyle = () => {
		return {
			position   : 'sticky',
			top        : '0',
			zIndex     : 10,
			background : this.props.darkMode === true ? '#393939' : 'white'
		};
	};
	render() {
		return (
			<Grid container style={this.getStyle()}>
				<Grid item>
					<DrawerMenu
						userLogged={this.props.userLogged}
						exportToCSV={this.props.exportToCSV}
						importCSV={this.props.importCSV}
						darkMode={this.props.darkMode}
						setDarkMode={this.props.setDarkMode}
					/>
				</Grid>
				<Grid item xs>
					<AddTodo addTodo={this.props.addTodo} />
				</Grid>
			</Grid>
		);
	}
}
