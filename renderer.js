// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";


import 'grommet/scss/vanilla/index.scss';
import Landing from './components/landing/Landing';
import Project from './components/project/Project';


class App extends React.Component {
  render () {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Landing} />
                <Route path="/project" component={Project} />
            </Switch>
        </Router>
    )
  }
}

ReactDOM.render(<App/>,document.getElementById('app'))
