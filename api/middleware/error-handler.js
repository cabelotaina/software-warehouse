// src/middleware/error-handler.js

const NODE_ENVIRONMENT = process.env.NODE_ENV || "development";

function errorHandlerMiddleware(error, request, response, next) {
	const errorMessage = getErrorMessage(error);

	logErrorMessage(errorMessage);

	if (response.headersSent) {
		return next(error);
	}

	const errorResponse = {
		statusCode: getHttpStatusCode({ error, response }),
		body: undefined
	};

	if (NODE_ENVIRONMENT !== "production") {
		errorResponse.body = errorMessage;
	}

	response.status(errorResponse.statusCode);

	response.format({
		"application/json": () => {
			response.json({ message: errorResponse.body });
		},
		default: () => {
			response.type("text/plain").send(errorResponse.body);
		},
	});
	next();
}

module.exports = errorHandlerMiddleware;

function getErrorMessage(error) {

	if (error.stack) {
		return error.stack;
	}

	if (typeof error.toString === "function") {
		return error.toString();
	}

	return "";
}

function logErrorMessage(error) {
	console.error(error);
}

function isErrorStatusCode(statusCode) {
	return statusCode >= 400 && statusCode < 600;
}

function getHttpStatusCode({ error, response }) {
	const statusCodeFromError = error.status || error.statusCode;
	if (isErrorStatusCode(statusCodeFromError)) {
		return statusCodeFromError;
	}

	const statusCodeFromResponse = response.statusCode;
	if (isErrorStatusCode(statusCodeFromResponse)) {
		return statusCodeFromResponse;
	}

	return 500;
}