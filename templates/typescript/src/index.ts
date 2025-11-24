import { App } from 'costro';
import About from './pages/about/index.js';
import Home from './pages/home/index.js';

const routes = [
	{
		path: '/',
		component: Home,
	},
	{
		path: '/about',
		component: About,
	},
];

new App({
	target: document.querySelector('#app') as HTMLElement,
	routes,
	mode: 'history',
});
