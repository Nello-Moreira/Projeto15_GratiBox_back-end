/* eslint-disable implicit-arrow-linebreak */
import { dbConnection } from './connection.js';

const searchUser = (email) =>
	dbConnection.query(
		`SELECT
			users.id, users.name, users.password, plans.type AS "planType"
		FROM users
		JOIN plans
			ON users.plan_id = plans.id
		WHERE email = $1 ;`,
		[email]
	);

const searchPlanInformations = (userId) =>
	dbConnection.query(
		`SELECT
			users.subscription_date, plans.type, delivery_options.name as delivery_option
		FROM users
		JOIN plans
			ON plans.id = users.plan_id
		JOIN delivery_options
			ON delivery_options.id = users.delivery_option_id
		WHERE users.id = $1;`,
		[userId]
	);

const insertUser = ({ name, email, password }) =>
	dbConnection.query(
		'INSERT INTO users (name, email, password) VALUES ($1, $2, $3);',
		[name, email, password]
	);

const updateUser = ({ id, planId, deliveryOption }) =>
	dbConnection.query(
		`UPDATE users
		SET
			plan_id = $2, delivery_option_id = $3, subscription_date = NOW()
		WHERE id = $1;`,
		[id, planId, deliveryOption]
	);

const deleteAllUsers = () => dbConnection.query('DELETE FROM users');

export {
	searchUser,
	searchPlanInformations,
	insertUser,
	updateUser,
	deleteAllUsers,
};
