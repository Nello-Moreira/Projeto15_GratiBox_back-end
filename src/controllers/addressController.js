import addressService from '../services/addressService.js';

async function getStates(request, response) {
	const stateOptions = await addressService.searchStates();

	if (!stateOptions) {
		return response.sendStatus(500);
	}

	if (stateOptions.rowCount === 0) {
		return response.sendStatus(204);
	}

	return response.status(200).send(stateOptions.rows);
}

export default { getStates };
