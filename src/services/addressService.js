import addressRepository from '../repositories/addressRepository.js';

async function searchStates() {
	return addressRepository.searchStates();
}

async function insertAddress({ userId, address }) {
	const addressId = await addressRepository.insertAddress({ userId, address });

	if (!addressId) {
		return null;
	}

	return addressId.rows[0].id;
}

async function deleteAddress({ addressId }) {
	return addressRepository.deleteAddress({ addressId });
}

export default {
	searchStates,
	insertAddress,
	deleteAddress,
};
