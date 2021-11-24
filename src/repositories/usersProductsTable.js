/* eslint-disable implicit-arrow-linebreak */
import { dbConnection } from './connection.js';

const searchSelectedProducts = (userId) =>
	dbConnection.query(
		`SELECT products.name
                FROM users_products
                JOIN products
                        ON products.id = users_products.product_id
                WHERE users_products.user_id = $1; `,
		[userId]
	);

const insertSelectedProducts = ({ userId, selectedProducts }) => {
	const valuesQuery = selectedProducts
		.map((productId) => `(${userId},${productId})`)
		.join(', ');

	return dbConnection.query(`
        INSERT INTO users_products
        (user_id, product_id)
        VALUES
        ${valuesQuery};`);
};

export { searchSelectedProducts, insertSelectedProducts };
