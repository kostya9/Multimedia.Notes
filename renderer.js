// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";


import 'grommet/scss/vanilla/index.scss';
import Landing from './components/landing/Landing';
import Project from './components/project/Project';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { projectReducer } from './reducers/project';

const store = new createStore(projectReducer);

class App extends React.Component {
  render () {
    return (
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route exact path="/" component={Landing} />
                    <Route path="/project" component={Project} />
                </Switch>
            </Router>
        </Provider>
    )
  }
}

ReactDOM.render(<App/>,document.getElementById('app'))
