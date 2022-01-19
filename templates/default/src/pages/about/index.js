import { Component } from 'costro';
import { h } from 'costro/jsx';
import Navigation from '../../components/navigation';
import './about.css';

export default class About extends Component {
	render() {
		return (
			<div id="about">
				<Navigation />
				<hr />
				<h2>About</h2>
			</div>
		);
	}
}
