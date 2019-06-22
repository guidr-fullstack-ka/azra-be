const express = require('express');
const helmet = require('helmet');
const cors = require('cors');


const authRouter = require('./auth/auth-router.js');

// const usersRouter = require('../users/users-router.js');
// const tripsRouter = require('../auth/auth-router.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
  res.send("It's alive!");
});

server.use('/api/auth', authRouter);
// server.use('/api/users', usersRouter);



module.exports = server;







