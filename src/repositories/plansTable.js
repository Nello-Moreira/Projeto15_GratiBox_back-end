/* eslint-disable implicit-arrow-linebreak */
import { dbConnection } from './connection.js';

const searchPlan = (planType) =>
	dbConnection.query('SELECT * FROM plan_types WHERE type = $1;', [planType]);

export default searchPlan;
