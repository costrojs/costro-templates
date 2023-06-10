import { Component } from 'costro';
import Navigation from '../../components/navigation';
import './home.css';

export default class Home extends Component {
	render() {
		return (
			<div id="home">
				<Navigation />
				<hr />
				<h2>Home</h2>
			</div>
		);
	}
}
