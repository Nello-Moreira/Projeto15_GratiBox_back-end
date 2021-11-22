/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
import { dbConnection } from './connection.js';

const insertSelectedProducts = ({ id, selectedProducts }) => {
	const valuesQuery = selectedProducts
		.map((productId) => `(${id},${productId})`)
		.join(', ');

	return dbConnection.query(`
        INSERT INTO users_products
        (user_id, product_id)
        VALUES
        ${valuesQuery};`);
};

export default insertSelectedProducts;
