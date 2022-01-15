import { Link } from 'costro';
import { h } from 'costro/jsx';

export default function Navigation() {
	return (
		<div>
			{/* @ts-ignore TODO: Remove when Costro types are fixed*/}
			<Link to="/">Home</Link>
			{/* @ts-ignore TODO: Remove when Costro types are fixed*/}
			<Link to="/about">About</Link>
		</div>
	);
}
