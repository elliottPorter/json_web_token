// require express
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();

const PORT = process.env.PORT || 8888;

const users = [
	{ id: 1, username: 'admin', password: 'admin' },
	{ id: 2, username: 'guest', password: 'guest' },
];

app.use(bodyParser.urlencoded());

app.use(bodyParser.json());

app.post('/login', (req, res) => {
	if (!req.body.username || !req.body.password) {
		res.status(400).send('A username and password is required');
		return;
	}

	const user = users.find((u) => {
		return u.username === req.body.username && u.password === req.body.password;
	});

	if (!user) {
		res.status(401).send('User not found');
		return;
	}

	const token = jwt.sign(
		{
			sub: user.id,
			username: user.username,
		},
		'mysecrettoken',
		{ expiresIn: '3 hours' }
	);

	res.status(200).send({ access_token: token });
});

app.get('/status', (req, res) => {
	const localTime = new Date().toLocaleTimeString();

	res.status(200).send(`Server time is ${localTime}`);
});

app.get('*', (req, res) => {
	res.status(404).send(`Page cannot be found`);
});

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
