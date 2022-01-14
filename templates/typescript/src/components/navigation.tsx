import { Link } from 'costro';
import { h } from 'costro/jsx';

export default function Navigation() {
	return (
		<div>
			{/* @ts-ignore */}
			<Link to="/">Home</Link>
			{/* @ts-ignore */}
			<Link to="/about">About</Link>
		</div>
	);
}
