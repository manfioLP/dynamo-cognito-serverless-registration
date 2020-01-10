const dynamodb = require("./dynamodb");
// const verifyEventId = require("../validators/eventId");
// const handleDeleteParams = require("../utils/handlers/handleDeleteParams");
// const callbackError = require("../utils/callbackError");

module.exports.delete = (event, context) => {
	const params = {
		TableName: "users",
		ConditionExpression: "id = :id",
		Key: {
			id: event.pathParameters.id
		},
		ReturnValues: "ALL_NEW"
	};

	// mask confidential data
	// set deleted=true and active=false
	// return id and status
	try {
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
