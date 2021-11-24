/* eslint-disable implicit-arrow-linebreak */
import { dbConnection } from './connection.js';

const searchSession = (token) =>
	dbConnection.query('SELECT * FROM sessions WHERE token = $1;', [token]);

const insertSession = (userId, token) =>
	dbConnection.query('INSERT INTO sessions (user_id, token) VALUES ($1, $2);', [
		userId,
		token,
	]);

const deleteAllSessions = () => dbConnection.query('DELETE FROM sessions');

export { searchSession, insertSession, deleteAllSessions };
