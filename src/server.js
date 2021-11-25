import '../setup/dotenvSetup.js';
import express from 'express';
import cors from 'cors';

import tokenMiddleware from './middlewares/tokenMiddleware.js';
import subscribe from './controllers/subscribe.js';

import userController from './controllers/userController.js';
import planController from './controllers/planController.js';
import addressController from './controllers/addressController.js';
import productController from './controllers/productController.js';

const server = express();
server.use(cors());
server.use(express.json());

server.post('/sign-up', userController.signUp);

server.post('/login', userController.login);

server.get('/products', productController.getProducts);

server.get('/states', addressController.getStates);

server.get('/plan-options', planController.getPlanOptions);

server.use(tokenMiddleware);

server.post(subscribe.route, subscribe.postSubscription);

server.get('/plan-informations', planController.getUserPlanInformations);

export default server;
