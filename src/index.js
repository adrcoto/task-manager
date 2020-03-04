const express = require('express');
const fs = require('fs');
const https = require('https');
require('./db/mongoose');

/**
 * Routers
 */
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

let app = express();

/**
 * Maintenance middleware
 */
/*
app.use((req, res, next) => {
    res.status(503).send('Site is currently down. Check back soon!');
});
*/


app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

/**
 * Server cert & port
 * @type {string | number}
 */
const port = process.env.PORT || 8532;
const key = fs.readFileSync(`${__dirname}/../cert/server.key`);
const cert = fs.readFileSync(`${__dirname}/../cert/server.crt`);

let server = https.createServer({ key, cert }, app);

server.listen(port, () => {
    console.log('Success', `Dev server listening on port ${port}`);
});


/**
 * Endpoints
 */

app.get('/', (req, res) => {
    res.send('Yolomaaaa');
});


