/* eslint-disable implicit-arrow-linebreak */
import { dbConnection } from './connection.js';

const insertAddress = ({ userId, address }) =>
	dbConnection.query(
		`
        INSERT INTO addresses
        (user_id, street_name, zip_code, city, state_id)
        VALUES
        ($1, $2, $3, $4, $5);`,
		[userId, address.streetName, address.zipCode, address.city, address.state]
	);

export default insertAddress;
