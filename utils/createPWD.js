module.exports = () => {
	/* eslint-disable no-plusplus */
	const length = 8;
	const charset = [
		"abcdefghijklmnopqrstuvwxyz",
		"ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
		"!@#$%^&*()+=-_/?><:;",
		"6231904785"
	];
	let retVal = "";

	for (let i = 0, n = charset.length; i < length; i++) {
		const set = Math.floor(Math.random()) * charset.length;
		retVal += charset[set].charAt(Math.floor(Math.random() * n));
	}
	// ensure it will have at least one char lower, upper, number and symbol.
	retVal += "a8L!";
	return retVal;
};
