import React, { Component } from 'react';

import { Button, Drawer, Container, TextField, ButtonGroup, Fade } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Axios from 'axios';

export default class DrawerMenu extends Component {
	state = {
		drawer       : false,
		username     : '',
		password     : '',
		action       : '',
		registration : false
	};

	render() {
		return (
			<React.Fragment>
				<Button
					onClick={() => this.setState({ drawer: true })}
					style={{ position: 'fixed', top: '0', left: '-10px' }}
				>
					<svg style={{ width: '24px', height: '24px' }} viewBox='0 0 24 24'>
						<path fill='currentColor' d='M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z' />
					</svg>
				</Button>
				<Drawer anchor='left' open={this.state.drawer} onClose={() => this.setState({ drawer: false })}>
					<form
						onSubmit={(e) => {
							if (this.state.action === 'register') {
								e.preventDefault();
								Axios.post('/api/login', {
									username : this.state.username,
									password : this.state.password
								})
									.then((_) => {
										this.setState({ registration: 'success' });
										setTimeout((_) => this.setState({ registration: false }), 3000);
									})
									.catch((err) => {
										this.setState({ registration: 'error' });
										setTimeout((_) => this.setState({ registration: false }), 3000);
									});
							}
							else if (this.state.action === 'login') {
								//login
							}
						}}
					>
						<Container style={{ width: '300px', paddingTop: '10px', paddingBottom: '10px' }}>
							<TextField
								label='Username'
								type='text'
								fullWidth={true}
								name='username'
								onChange={(e) => {
									this.setState({ username: e.target.value });
								}}
							/>
							<TextField
								label='Password'
								type='password'
								fullWidth={true}
								name='password'
								onChange={(e) => {
									this.setState({ password: e.target.value });
								}}
							/>
							<ButtonGroup color='primary' fullWidth={true} style={{ marginTop: '10px' }}>
								<Button onClick={(_) => this.setState({ action: 'register' })} type='submit'>
									Register
								</Button>
								<Button onClick={(_) => this.setState({ action: 'login' })} type='submit'>
									Login
								</Button>
							</ButtonGroup>
							<Fade in={this.state.registration}>
								<Alert severity={this.state.registration === false ? 'error' : this.state.registration}>
									{this.state.registration === 'success' ? (
										'Registration complete'
									) : (
										'Registration failed'
									)}
								</Alert>
							</Fade>
						</Container>
					</form>
				</Drawer>
			</React.Fragment>
		);
	}
}
