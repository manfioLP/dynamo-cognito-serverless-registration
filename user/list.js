const dynamodb = require("./dynamodb");
// const callbackError = require("../utils/callbackError");

module.exports.list = (event, context) => {
	const params = {
		TableName: "users"
	};

	try {
		dynamodb.scan(params, (error, result) => {
			// handle potential errors
			if (error) throw error;
			return {
				statusCode: 200,
				body: JSON.stringify(result.Items)
			};
		});
	} catch (error) {
		// TODO: Handle error
		throw error;
	}
};
