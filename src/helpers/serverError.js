/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

const internalErrorResponse = (response, error) => {
	response
		.status(500)
		.send('There was an internal error. Please try again later.');
	console.error(error);
};

export default internalErrorResponse;
