import Navigation from '@src/components/navigation.tsx';

describe('Navigation constructor', () => {
	it('Should call the navigation function', () => {
		const result = Navigation();

		expect(result).toStrictEqual(
			<ul>
				<li>
					<a href="/">Home</a>
				</li>
				<li>
					<a href="/about">About</a>
				</li>
			</ul>,
		);
	});
});
