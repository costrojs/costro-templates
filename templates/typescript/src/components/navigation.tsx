import { Link } from 'costro';
import { h } from 'costro/jsx';

export default function Navigation() {
	return (
		<ul>
			<li>
				<Link to="/">Home</Link>
			</li>
			<li>
				<Link to="/about">About</Link>
			</li>
		</ul>
	);
}
