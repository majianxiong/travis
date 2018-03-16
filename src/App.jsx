import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
import asyncComponent from './asyncComponent.jsx';

const Component1 = asyncComponent(() => import('./Component1.jsx').then(module => module.default), {});
const Component2 = asyncComponent(() => import('./Component2.jsx').then(module => module.default), {});
const Component3 = asyncComponent(() => import('./Component3.jsx').then(module => module.default), {});
const Component4 = asyncComponent(() => import('./Component4.jsx').then(module => module.default), {});


export default class App extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<Router>
				<div id="app-content" className="app-content">
					<Link to='/'>Component1</Link> &nbsp;
					<Link to='/Component2'>Component2</Link> &nbsp;
					<Link to='/Component3'>Component3</Link> &nbsp;
					<Link to='/Component4'>Component4</Link>
					<div id="main-content" className="main-content">
						<Route exact path="/" component={Component1} />
						<Route exact path="/Component2" component={Component2} />
						<Route exact path="/Component3" component={Component3} />
						<Route exact path="/Component4" component={Component4} />
					</div>
				</div>
			</Router>
		);
	}
}	