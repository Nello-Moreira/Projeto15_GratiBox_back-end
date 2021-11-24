/* eslint-disable implicit-arrow-linebreak */
import { dbConnection } from './connection.js';

const searchLastDelivery = (userId) =>
	dbConnection.query(
		'SELECT * FROM deliveries WHERE user_id = $1 ORDER BY id DESC LIMIT 1;',
		[userId]
	);

const deleteAllDeliveries = () => dbConnection.query('DELETE FROM deliveries');

export { searchLastDelivery, deleteAllDeliveries };
