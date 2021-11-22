/* eslint-disable implicit-arrow-linebreak */
import { dbConnection } from './connection.js';

const searchPlan = (planType) =>
	dbConnection.query('SELECT * FROM plans WHERE type = $1;', [planType]);

export default searchPlan;
