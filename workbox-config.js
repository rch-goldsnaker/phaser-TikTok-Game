module.exports = {
	globDirectory: '.',
	globPatterns: [
		'**/*.{js,png,html,json}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};