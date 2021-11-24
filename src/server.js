import '../setup/dotenvSetup.js';
import express from 'express';
import cors from 'cors';

import tokenMiddleware from './middlewares/tokenMiddleware.js';
import planOptions from './controllers/planOptions.js';
import subscribe from './controllers/subscribe.js';
import planInformations from './controllers/planInformations.js';

import userController from './controllers/userController.js';
import planController from './controllers/planController.js';
import addressController from './controllers/addressController.js';

const server = express();
server.use(cors());
server.use(express.json());

server.post('/sign-up', userController.signUp);

server.post('/login', userController.login);

server.get('/products', planController.getProducts);

server.get('/states', addressController.getStates);

server.get(planOptions.route, planOptions.getPlanOptions);

server.use(tokenMiddleware);

server.post(subscribe.route, subscribe.postSubscription);

server.get(planInformations.route, planInformations.getPlanInformations);

export default server;
