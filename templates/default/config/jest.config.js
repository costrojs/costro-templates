export default {
	rootDir: '../',
	moduleNameMapper: {
		'^@src(.*)$': '<rootDir>/src$1',
	},
	testEnvironment: 'jsdom',
	testMatch: ['<rootDir>/tests/**/*.test.js'],
	transform: {
		'\\.(js|jsx)$': ['babel-jest', { configFile: './config/babel.config.js' }],
	},
};
