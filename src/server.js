import '../setup/dotenvSetup.js';
import express from 'express';
import cors from 'cors';

import signup from './controllers/signUp.js';

const server = express();
server.use(cors());
server.use(express.json());

server.post(signup.route, signup.postRoute);

export default server;
