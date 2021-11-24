/* eslint-disable no-console */
import { dbConnection } from './connection.js';

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
		await dbConnection.query('DELETE FROM sessions;');
		await dbConnection.query('DELETE FROM users_plans;');
		await dbConnection.query('DELETE FROM users;');
		return true;
	} catch (error) {
		console.error(error);
		return null;
	}
}

async function searchSession(token) {
	try {
		return await dbConnection.query(
			'SELECT * FROM sessions WHERE token = $1;',
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

export default {
	searchUserByEmail,
	insertUser,
	deleteAllUsers,
	searchSession,
	insertSession,
	deleteAllSessions,
};
