module.exports = (api) => {
	api.cache(true);
	return {
		presets: [
			'@babel/preset-env',
			[
				'@babel/preset-react',
				{
					importSource: 'jsx-dom-cjs',
					runtime: 'automatic'
				}
			]
		],
		plugins: []
	};
};
