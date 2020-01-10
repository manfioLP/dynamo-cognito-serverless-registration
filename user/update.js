const dynamodb = require("./dynamodb");
// const verifyEventId = require("../validators/eventId");
// const setUpdateOptions = require("../validators/setUpdateOptions");
// const callbackError = require("../utils/callbackError");

module.exports.update = (event, context) => {
	const data = JSON.parse(event.body);
	const timestamp = new Date().getTime();
	const params = {
		TableName: "users",
		Key: {
			id: event.pathParameters.id
		},
		ConditionExpression: "id = :id",
		UpdateExpression: "SET updatedAt = :updatedAt",
		ExpressionAttributeValues: {
			":updatedAt": timestamp,
			":id": event.pathParameters.id
		},
		ReturnValues: "ALL_NEW"
	};

	try {
		// TODO: set update options on different function, handling reserved keywords
		setUpdateOptions(data, event, params);
		dynamodb.update(params, (error, result) => {
			// TODO: handle error
			if (error) throw error;
			return {
				statusCode: 200,
				body: JSON.stringify(result.Attributes)
			};
		});
	} catch (error) {
		// TODO: handle error
		throw error;
	}
};
