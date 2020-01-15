const aws = require("aws-sdk");
const nodeFetch = require("node-fetch");
const generatePassword = require("../../utils/createPWD");
const { cognitoConfig } = require("./config");

global.fetch = nodeFetch;

import config from '../../config';

const { CognitoIdentityServiceProvider } = aws;
const client = new CognitoIdentityServiceProvider({ apiVersion: "2016-04-19" });

aws.config.update({
	cognitoConfig
});

function insertOnCognito(params) {
	return new Promise((resolve, reject) => {
		client.adminCreateUser(params, (err, data) => {
			if (err) {
				reject(err);
			} else {
				const cognitoResponse = {};
				data.User.Attributes.forEach(el => {
					cognitoResponse[`${el.Name}`] = el.Value;
				});
				cognitoResponse.username = data.User.Username;
				resolve(cognitoResponse);
			}
		});
	});
}

module.exports = async function(userData) {
	const { email, phone } = userData;

	// TODO: check not sending temporary password
	const generatedPassword = generatePassword();

	const params = {
		UserPoolId: config.USER_POOL_ID,
		Username: `${email}-${phone}`,
		DesiredDeliveryMediums: ["EMAIL"],
		ForceAliasCreation: false,
		TemporaryPassword: generatedPassword,
		UserAttributes: [
			{ Name: "email", Value: email },
			{ Name: "phone_number", Value: phone },
			{ Name: "email_verified", Value: "true" }
		]
	};

	const { sub, phone_number, ...cognitoResponse } = await insertOnCognito(
		params
	);
	return { ...cognitoResponse, id: sub, phone: phone_number };
};
