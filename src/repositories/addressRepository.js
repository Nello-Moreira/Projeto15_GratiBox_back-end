/* eslint-disable no-console */
import { dbConnection } from './connection.js';

async function searchStates() {
	try {
		return await dbConnection.query('SELECT * FROM states;');
	} catch (error) {
		console.error(error);
		return null;
	}
}

export default { searchStates };
