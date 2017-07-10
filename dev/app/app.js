// Include the Main React Dependencies
var React = require("react");
var ReactDOM = require("react-dom");
// Include the React library
var React = require("react");

// Include the react-router module
var router = require("react-router");

// Include the Route component for displaying individual routes
var Route = router.Route;

// Include the Router component to contain all our Routes
var Router = router.Router;
import { browserHistory } from 'react-router'
import Main from '../components/Main'
// Grabs the Routes
import routes from "../config/routes";

// Renders the contents according to the route page.
ReactDOM.render((<Main />), document.getElementById("app"));
