/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
import { dbConnection } from './connection.js';

const insertAddress = ({ id, address }) =>
	dbConnection.query(
		`
        INSERT INTO addresses
        (street_name, zip_code, city, state_id, user_id)
        VALUES
        ($1, $2, $3, $4, $5);`,
		[address.streetName, address.zipCode, address.city, address.state, id]
	);

export default insertAddress;
