const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../../models/User');

const jwt = require('jsonwebtoken');

// @route   POST api/login/login
// @desc    Login user
// @params  username: string
//          password: string
router.post('/login', (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	console.log('Username: ' + username);
	console.log('Password: ' + password);
	console.log('Secret: ' + process.env.SECRET);

	User.findOne({ username })
		.then((user) => {
			bcrypt
				.compare(password, user.password)
				.then((result) => {
					if (result) {
						const token = jwt.sign({ username }, process.env.SECRET, { expiresIn: '24h' });

						res.cookie('authToken', token, { httpOnly: true }).status(200).send(user);
					}
					else {
						res.status(403).send('Password incorrect');
					}
				})
				.catch((err) => res.status(400).send("Coulnd't check passwords: " + err));
		})
		.catch((err) => res.status(400).send(username + " doesn't exists"));
});

// @route   POST api/login/register
// @desc    Create a new user
router.post('/register', (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	User.findOne({ username })
		.then((user) => res.status(403).send('User ' + user.username + ' already exists'))
		.catch((_) =>
			bcrypt
				.hash(req.body.password, 10)
				.then((password) => {
					const user = new User({ username: req.body.username, password })
						.save()
						.then((user) => res.status(200).send('Registration succesfull ' + user.username));
				})
				.catch((err) => res.status(400).send('Registration failed: ' + err))
		);
});

router.get('/isLoggedIn', (req, res) => {
	const authToken = req.cookies['authToken'];
	if (authToken) {
		//res.status(200).send(authToken);
		res.status(200).send(jwt.decode(authToken, process.env.SECRET)['username']);
	}
	else {
		res.status(200).send(null);
	}
});

router.get('/disconnect', (req, res) => {
	console.log('Before cookie set');
	res.cookie('authToken', 'test', { maxAge: 0 }).status(200).send();
	console.log('After cookie set');
});

module.exports = router;
