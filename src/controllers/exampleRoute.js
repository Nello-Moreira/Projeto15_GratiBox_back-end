import internalErrorResponse from '../helpers/serverError.js';

const route = '/example-route';

async function getRoute(request, response) {
	try {
		return response.status(501).send('this is an example route');
	} catch (error) {
		return internalErrorResponse(response, error);
	}
}

const exampleRoute = {
	route,
	getRoute,
};

export default exampleRoute;
