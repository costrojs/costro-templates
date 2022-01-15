module.exports = {
	rootDir: '../',
	collectCoverage: true,
	coverageDirectory: 'coverage',
	moduleNameMapper: {
		'^@src(.*)$': '<rootDir>/src$1'
	},
	resetModules: true,
	verbose: true,
	testEnvironment: 'jsdom',
	testMatch: ['<rootDir>/tests/**/*.test.js'],
	resolver: './config/jest-resolver.js',
	transform: {
		'\\.(js|jsx)$': ['babel-jest', { configFile: './config/babel.config.js' }]
	}
};
