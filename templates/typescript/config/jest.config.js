module.exports = {
	rootDir: '../',
	collectCoverage: true,
	coverageDirectory: 'coverage',
	moduleNameMapper: {
		'^@src(.*)$': '<rootDir>/src$1'
	},
	moduleFileExtensions: ['tsx', 'ts', 'js', 'jsx'],
	resetModules: true,
	verbose: true,
	preset: 'ts-jest/presets/js-with-babel',
	testEnvironment: 'jsdom',
	testMatch: ['<rootDir>/tests/**/*.test.js'],
	resolver: './config/jest-resolver.js',
	moduleDirectories: ['<rootDir>/node_modules'],
	transform: {
		'\\.(js|jsx|ts|tsx)$': ['ts-jest', { configFile: './config/babel.config.js' }]
	}
};
