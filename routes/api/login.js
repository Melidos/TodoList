const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../../models/User');

const jwt = require('jsonwebtoken');

// @route   GET api/login
// @desc    Login user
// @params  username: string
//          password: string
router.get('/', (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	User.findOne({ username })
		.then((user) => {
			bcrypt
				.compare(password, user.password)
				.then((result) => {
					if (result) {
						const token = jwt.sign(username, process.env.SECRET, { expiresIn: '24h' });
						res.cookie('token', token, { httpOnly: true }).status(200).send('Login Successfull');
					}
					else {
						res.status(403).send('Password incorrect');
					}
				})
				.catch((err) => res.status(400).send("Coulnd't check passwords: " + err));
		})
		.catch((err) => res.status(400).send(username + " doesn't exists"));
});

// @route   POST api/todos
// @desc    Create a new user
router.post('/', (req, res) => {
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

module.exports = router;
