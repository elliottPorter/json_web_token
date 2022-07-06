// require express
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const PORT = process.env.PORT || 8888;

app.use(bodyParser.urlencoded());

app.use(bodyParser.json());

app.post('/login', (req, res) => {
	const user = req.body.username;

    res
    .status(200).send(`You have logged in with ${user}`)
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
