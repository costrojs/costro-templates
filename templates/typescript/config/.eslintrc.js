module.exports = {
	env: {
		browser: true,
		node: true,
		jest: true
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:prettier/recommended',
		'plugin:@typescript-eslint/recommended'
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		babelOptions: {
			configFile: './config/babel.config.js'
		}
	},
	rules: {
		'react/display-name': 0,
		'react/jsx-key': 0,
		'react/prop-types': 0,
		'@typescript-eslint/ban-ts-comment': 'off',
		'@typescript-eslint/no-var-requires': 'off',
		'@typescript-eslint/no-explicit-any': 'off'
	},
	settings: {
		react: {
			fragment: 'F', // Fragment
			pragma: 'h', // createElement
			version: '0' // Remove the warning of the missing React package
		}
	}
};
