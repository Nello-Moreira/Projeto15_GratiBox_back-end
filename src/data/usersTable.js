/* eslint-disable implicit-arrow-linebreak */
import { dbConnection } from './connection.js';

const searchUser = (email) =>
	dbConnection.query('SELECT * FROM users WHERE email = $1 ;', [email]);

const insertUser = ({ name, email, password }) =>
	dbConnection.query(
		'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id;',
		[name, email, password]
	);

const deleteAllUsers = () => dbConnection.query('DELETE FROM users');

export { searchUser, insertUser, deleteAllUsers };
