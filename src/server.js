import '../setup/dotenvSetup.js';
import express from 'express';
import cors from 'cors';

import tokenMiddleware from './middlewares/tokenMiddleware.js';
import signup from './controllers/signUp.js';
import login from './controllers/login.js';
import planOptions from './controllers/planOptions.js';
import products from './controllers/products.js';
import states from './controllers/states.js';

const server = express();
server.use(cors());
server.use(express.json());

server.post(signup.route, signup.postSignUp);
server.post(login.route, login.postLogin);

server.use(tokenMiddleware);

server.get(planOptions.route, planOptions.getPlanOptions);

server.get(products.route, products.getProducts);

server.get(states.route, states.getStates);

export default server;
