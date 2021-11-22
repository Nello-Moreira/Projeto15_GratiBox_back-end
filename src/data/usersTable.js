/* eslint-disable comma-dangle */
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

const insertUser = ({ name, email, password }) =>
	dbConnection.query(
		'INSERT INTO users (name, email, password) VALUES ($1, $2, $3);',
		[name, email, password]
	);

const updateUser = (userId, planId) =>
	dbConnection.query('UPDATE users SET plan_id = $2 WHERE id = $1;', [
		userId,
		planId,
	]);

const deleteAllUsers = () => dbConnection.query('DELETE FROM users');

export { searchUser, insertUser, updateUser, deleteAllUsers };
