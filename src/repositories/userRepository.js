/* eslint-disable no-console */
import { dbConnection } from './connection.js';

async function searchSession({ token }) {
	try {
		return await dbConnection.query(
			'SELECT user_id AS "userId" FROM sessions WHERE token = $1;',
			[token]
		);
	} catch (error) {
		console.error(error);
		return null;
	}
}

async function insertSession({ userId, token }) {
	try {
		await dbConnection.query(
			'INSERT INTO sessions (user_id, token) VALUES ($1, $2);',
			[userId, token]
		);
		return true;
	} catch (error) {
		console.error(error);
		return null;
	}
}

async function searchUserByParam({ param, value }) {
	try {
		return await dbConnection.query(
			`SELECT * FROM users WHERE ${param} = $1 ;`,
			[value]
		);
	} catch (error) {
		console.error(error);
		return null;
	}
}

async function insertUser({ name, email, password }) {
	try {
		return await dbConnection.query(
			'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id;',
			[name, email, password]
		);
	} catch (error) {
		console.error(error);
		return null;
	}
}

export default {
	searchUserByParam,
	insertUser,
	searchSession,
	insertSession,
};
