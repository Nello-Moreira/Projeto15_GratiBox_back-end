/* eslint-disable no-console */
import { dbConnection } from './connection.js';

async function deleteAllAddresses() {
	try {
		await dbConnection.query('DELETE FROM addresses;');
		return true;
	} catch (error) {
		console.error(error);
		return null;
	}
}

async function searchStates() {
	try {
		return await dbConnection.query('SELECT * FROM states;');
	} catch (error) {
		console.error(error);
		return null;
	}
}

async function insertState({ name, initials }) {
	try {
		return await dbConnection.query(
			`INSERT INTO
                states (name, initials)
            VALUES ($1, $2)
            RETURNING id;`,
			[name, initials]
		);
	} catch (error) {
		console.error(error);
		return null;
	}
}

async function deleteAllStates() {
	try {
		await deleteAllAddresses();
		await dbConnection.query('DELETE FROM states;');
		return true;
	} catch (error) {
		console.error(error);
		return null;
	}
}

export default { searchStates, insertState, deleteAllStates };
