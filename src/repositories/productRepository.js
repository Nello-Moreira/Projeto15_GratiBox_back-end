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

async function insertProduct(name) {
	try {
		return await dbConnection.query(
			`
			INSERT INTO products
				(name)
			VALUES
				($1)
			RETURNING id;`,
			[name]
		);
	} catch (error) {
		console.error(error);
		return null;
	}
}

async function deleteAllProducts() {
	try {
		await dbConnection.query('DELETE FROM users_products;');
		await dbConnection.query('DELETE FROM products;');
		return true;
	} catch (error) {
		console.error(error);
		return null;
	}
}

export default {
	searchProducts,
	insertProduct,
	deleteAllProducts,
};
