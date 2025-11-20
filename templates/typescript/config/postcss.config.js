export default {
	plugins: [
		'postcss-url',
		'postcss-nested',
		[
			'postcss-preset-env',
			{
				stage: 2,
				features: {
					'nesting-rules': false,
				},
			},
		],
	],
};
