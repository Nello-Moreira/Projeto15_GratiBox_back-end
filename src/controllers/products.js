import internalErrorResponse from '../helpers/serverError.js';
import { searchProducts } from '../data/productsTable.js';

const route = '/products';

async function getProducts(request, response) {
	try {
		const options = await searchProducts();

		if (options.rowCount === 0) {
			return response.sendStatus(204);
		}

		return response.status(200).send(options.rows);
	} catch (error) {
		return internalErrorResponse(response, error);
	}
}

const products = {
	route,
	getProducts,
};

export default products;
