export default function babelConfig(api) {
	api.cache(true)
	return {
		presets: [
			'@babel/preset-env',
			[
				'@babel/preset-react',
				{
					runtime: 'automatic',
					importSource: 'jsx-dom-cjs'
				}
			]
		]
	}
}
