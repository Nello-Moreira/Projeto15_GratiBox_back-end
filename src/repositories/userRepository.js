/* eslint-disable no-console */
import { dbConnection } from './connection.js';

async function searchUserByEmail(email) {
	try {
		return await dbConnection.query('SELECT * FROM users WHERE email = $1 ;', [
			email,
		]);
	} catch (error) {
		console.error(error);
		return false;
	}
}

async function insertSession({ userId, token }) {
	try {
		return await dbConnection.query(
			'INSERT INTO sessions (user_id, token) VALUES ($1, $2);',
			[userId, token]
		);
	} catch (error) {
		console.error(error);
		return false;
	}
}

export default {
	searchUserByEmail,
	insertSession,
};
