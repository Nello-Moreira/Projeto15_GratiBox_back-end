import internalErrorResponse from '../helpers/serverError.js';
import searchStates from '../data/statesTable.js';

const route = '/states';

async function getStates(request, response) {
	try {
		const options = await searchStates();

		if (options.rowCount === 0) {
			return response.sendStatus(204);
		}

		return response.status(200).send(options.rows);
	} catch (error) {
		return internalErrorResponse(response, error);
	}
}

const states = {
	route,
	getStates,
};

export default states;
