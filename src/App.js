import React from "react";
import classes from "./App.module.css";
import Browse from "./containers/Browse/Browse";
import Landing from "./containers/Landing/Landing";
import List from "./containers/List/List.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
	let routes = (
		<Router>
			<Switch>
				<Route path="/browse" component={Browse} />
				<Route path="/list" component={List} />
				<Route exact path="/" component={Landing} />
			</Switch>
		</Router>
	);
	return <div className={classes.app}>{routes}</div>;
};

export default App;
