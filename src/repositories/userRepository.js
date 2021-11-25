/* eslint-disable no-console */
import { dbConnection } from './connection.js';

async function searchSession(token) {
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

async function deleteAllSessions() {
	try {
		await dbConnection.query('DELETE FROM sessions;');
		return true;
	} catch (error) {
		console.error(error);
		return null;
	}
}

async function searchUserByEmail(email) {
	try {
		return await dbConnection.query('SELECT * FROM users WHERE email = $1 ;', [
			email,
		]);
	} catch (error) {
		console.error(error);
		return null;
	}
}

async function searchUserByToken(token) {
	try {
		return await dbConnection.query(
			`
			SELECT users.id, users.name, users.email
			FROM users
			JOIN sessions
				ON sessions.user_id = users.id
			WHERE sessions.token = $1 ;`,
			[token]
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

async function deleteAllUsers() {
	try {
		await deleteAllSessions();
		await dbConnection.query('DELETE FROM users_products;');
		await dbConnection.query('DELETE FROM users_plans;');
		await dbConnection.query('DELETE FROM users;');
		return true;
	} catch (error) {
		console.error(error);
		return null;
	}
}

export default {
	searchUserByEmail,
	searchUserByToken,
	insertUser,
	deleteAllUsers,
	searchSession,
	insertSession,
	deleteAllSessions,
};
