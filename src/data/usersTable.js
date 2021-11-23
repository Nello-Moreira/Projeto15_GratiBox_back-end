/* eslint-disable implicit-arrow-linebreak */
import { dbConnection } from './connection.js';

const searchUser = (email) =>
	dbConnection.query(
		`SELECT
			users.id, users.name, users.password, plans.type AS "planType"
		FROM users
		JOIN users_plans
			ON users_plans.user_id = users.id
		JOIN plans
			ON plans.id = users_plans.plan_id
		WHERE email = $1 ;`,
		[email]
	);

const insertUser = ({ name, email, password }) =>
	dbConnection.query(
		'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id;',
		[name, email, password]
	);

const deleteAllUsers = () => dbConnection.query('DELETE FROM users');

export { searchUser, insertUser, deleteAllUsers };
