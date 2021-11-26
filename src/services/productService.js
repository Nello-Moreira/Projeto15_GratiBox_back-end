import productRepository from '../repositories/productRepository.js';

async function getUserProductsList({ userId }) {
	const productsList = await productRepository.searchUserChosenProducts({
		userId,
	});

	if (!productsList) {
		return null;
	}

	return productsList.rows.map((product) => product.name);
}

async function insertProducts({ userId, productsList }) {
	return productRepository.insertSelectedProducts({ userId, productsList });
}

export default { getUserProductsList, insertProducts };
