/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
import { dbConnection } from './connection.js';

const searchStates = () => dbConnection.query('SELECT * FROM states;');

export default searchStates;
