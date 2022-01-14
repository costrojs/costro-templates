module.exports = {
	rootDir: '../',
	collectCoverage: true,
	coverageDirectory: 'coverage',
	// modulePaths: ['../src'],
	resetModules: true,
	verbose: true,
	preset: 'ts-jest/presets/js-with-babel',
	testEnvironment: 'jsdom',
	resolver: './config/jest-resolver.js',
	moduleDirectories: ['<rootDir>/node_modules'],
	transform: {
		'\\.(js|jsx|ts|tsx)$': ['ts-jest', { configFile: './config/babel.config.js' }]
	}
};
