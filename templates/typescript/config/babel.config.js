export default (api) => {
	api.cache(true);
	return {
		presets: [
			'@babel/preset-env',
			[
				'@babel/preset-react',
				{
					runtime: 'automatic',
					importSource: 'costro',
				},
			],
		],
	};
};
