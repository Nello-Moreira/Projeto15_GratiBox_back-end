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
	const { receiverName, zipCode, streetName, city, stateId } = address;

	try {
		return dbConnection.query(
			`
			INSERT INTO addresses
				(user_id, receiver_name, zip_code, street_name, city, state_id)
			VALUES ($1, $2, $3, $4, $5, $6)
			RETURNING id;`,
			[userId, receiverName, zipCode, streetName, city, stateId]
		);
	} catch (error) {
		console.error(error);
		return null;
	}
}

async function deleteAddress({ addressId }) {
	try {
		return dbConnection.query(
			`
			DELETE FROM addresses WHERE id = $1;`,
			[addressId]
		);
	} catch (error) {
		console.error(error);
		return null;
	}
}

export default { searchStates, insertAddress, deleteAddress };
