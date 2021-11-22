import '../setup/dotenvSetup.js';
import express from 'express';
import cors from 'cors';

import signup from './controllers/signUp.js';
import login from './controllers/login.js';

const server = express();
server.use(cors());
server.use(express.json());

server.post(signup.route, signup.postSignUp);
server.post(login.route, login.postLogin);

export default server;
