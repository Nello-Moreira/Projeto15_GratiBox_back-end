/* eslint-disable implicit-arrow-linebreak */
import { dbConnection } from './connection.js';

const searchUserByEmail = (email) =>
	dbConnection.query('SELECT * FROM users WHERE email = $1 ;', [email]);

const searchUserByToken = (token) =>
	dbConnection.query(
		`
		SELECT id
		FROM users
		JOIN sessions
			ON sessions.user_id = users.id
		WHERE sessions.token = $1 ;`,
		[token]
	);

const insertUser = ({ name, email, password }) =>
	dbConnection.query(
		'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id;',
		[name, email, password]
	);

const deleteAllUsers = () => dbConnection.query('DELETE FROM users');

export { searchUserByEmail, searchUserByToken, insertUser, deleteAllUsers };
