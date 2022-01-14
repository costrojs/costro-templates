module.exports = {
	collectCoverage: true,
	// modulePaths: ['../src'],
	resetModules: true,
	verbose: true,
	rootDir: '../',
	coverageDirectory: 'coverage',
	testEnvironment: 'jsdom',
	resolver: './config/jest-resolver.js',
	transform: {
		'\\.(js|jsx)$': ['babel-jest', { configFile: './config/babel.config.js' }]
	}
};
