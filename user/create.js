const dynamodb = require("./dynamodb");
const createCognitoUser = require("../providers/aws/CognitoCreate");

const params = {
	TableName: "users",
	ConditionExpression: "attribute_not_exists(id)"
};

module.exports.create = async (event, context) => {
	const timestamp = new Date().getTime();
	const eventBody = JSON.parse(event.body);
	let data = {};

	// TODO: verify cognito call
	const cognitoResponse = createCognitoUser({
		email: eventBody.email,
		phone: eventBody.phone
	});

	try {
		data = {
			...eventBody,
			deleted: false,
			isActive: true,
			finishedSignUp: false,
			createdAt: timestamp,
			updatedAt: timestamp,
			id: cognitoResponse.id,
			username: cognitoResponse.username,
		};
	} catch (err) {
		// TODO: handler error
		throw err;
	}

	// TODO: validate data before adding to params
	params.Item = data;

	dynamodb.put(params, (err, result) => {
		console.error(err);
		// TODO: handle Error
		if (err) throw err;
		const response = {
			statusCode: 200,
			body: JSON.stringify(result)
		};
		console.log(response);
		return response;
	});
};
