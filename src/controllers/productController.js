import productRepository from '../repositories/productRepository.js';

async function getProducts(request, response) {
	const products = await productRepository.searchProducts();

	if (!products) {
		return response.sendStatus(500);
	}

	if (products.rowCount === 0) {
		return response.sendStatus(204);
	}

	return response.status(200).send(products.rows);
}

export default { getProducts };
