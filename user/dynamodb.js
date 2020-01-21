// 'use strict'
import config from '../config';
const AWS = require("aws-sdk"); // eslint-disable-line import/no-extraneous-dependencies

let options = {
	// dynamo configs
};

// connect to local DB if running offline
if (config.IS_OFFLINE) {
	options = {
		region: "localhost",
		endpoint: "http://localhost:8000"
	};
}

AWS.config.update({
	region: "us-east-1",
	accessKeyId: "accessKeyId",
	secretAccessKey: "secretAccessKey",
	endpoint: new AWS.Endpoint("http://localhost:8000")
});

const client = new AWS.DynamoDB.DocumentClient(options);

module.exports = client;
