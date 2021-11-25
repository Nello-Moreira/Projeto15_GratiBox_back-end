import addressRepository from '../repositories/addressRepository.js';

async function searchStates() {
	return addressRepository.searchStates();
}

async function insertAddress({ userId, address }) {
	return addressRepository.searchStates({ userId, address });
}

export default {
	searchStates,
	insertAddress,
};
