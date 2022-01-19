import { Link } from 'costro';
import { h } from 'costro/jsx';

export default function Navigation() {
	return (
		<ul>
			<li>
				{/* @ts-ignore TODO: Remove when Costro types are fixed*/}
				<Link to="/">Home</Link>
			</li>
			<li>
				{/* @ts-ignore TODO: Remove when Costro types are fixed*/}
				<Link to="/about">About</Link>
			</li>
		</ul>
	);
}
