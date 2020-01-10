const dynamodb = require("./dynamodb");
// const verifyId = require("../validators/eventId");
// const callbackError = require("../utils/callbackError");

module.exports.get = (event, context) => {
	const params = {
		TableName: "users",
		Key: {
			id: event.pathParameters.id
		},
		KeyConditionExpression: 'id = :id'
	};

	try {
		dynamodb.get(params, (error, result) => {
			if (error) throw error;

			return {
				statusCode: 200,
				body: JSON.stringify(result.Item)
			};
		});
	} catch (error) {
		// TODO: handle error
		throw error
	}
};
