// require express
const express = require('express')
const app = express()

const PORT = 8888

app.get('/status', ( req, res) => {
    const localTime = (new Date()).toLocaleTimeString()

    res
    .status(200)
    .send(`Server time is ${localTime}`)
})

app.get('*', ( req, res ) => {

    res
    .status(404)
    .send(`Page cannot be found`);
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})
