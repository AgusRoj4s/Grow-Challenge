const express = require('express');
const routes = require('./src/routes/index');

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/', routes());

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log(`server listening on: http://localhost:${PORT}`);
});

server.on('error', error => {
    console.log('server error:', error);
});