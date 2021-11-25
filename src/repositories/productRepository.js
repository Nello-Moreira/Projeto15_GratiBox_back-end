/* eslint-disable no-console */
import { dbConnection } from './connection.js';

async function searchProducts() {
	try {
		return await dbConnection.query('SELECT * FROM products;');
	} catch (error) {
		console.error(error);
		return null;
	}
}

async function searchUserChosenProducts({ userId }) {
	try {
		return await dbConnection.query(
			`
			SELECT
				products.name
			FROM products
			JOIN users_products
				ON products.id = users_products.product_id
			WHERE users_products.user_id = $1;`,
			[userId]
		);
	} catch (error) {
		console.error(error);
		return null;
	}
}

export default {
	searchProducts,
	searchUserChosenProducts,
};
