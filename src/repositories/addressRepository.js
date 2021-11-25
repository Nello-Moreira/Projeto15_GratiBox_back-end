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

async function insertAddress({ userId, address }) {
	const { streetName, zipCode, city, state } = address;

	try {
		return dbConnection.query(
			`
			INSERT INTO addresses
				(user_id, street_name, zip_code, city, state_id)
			VALUES ($1, $2, $3, $4, $5);`,
			[userId, streetName, zipCode, city, state]
		);
	} catch (error) {
		console.error(error);
		return null;
	}
}

export default { searchStates, insertAddress };
