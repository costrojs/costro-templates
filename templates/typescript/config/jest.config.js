export default {
	rootDir: '../',
	moduleNameMapper: {
		'^@src(.*)$': '<rootDir>/src$1',
	},
	preset: 'ts-jest/presets/js-with-babel',
	testEnvironment: 'jsdom',
	testMatch: ['<rootDir>/tests/**/*.test.js'],
	moduleDirectories: ['<rootDir>/node_modules'],
	transform: {
		'\\.(js|jsx|ts|tsx)$': ['ts-jest', { configFile: './config/babel.config.js' }],
	},
};
