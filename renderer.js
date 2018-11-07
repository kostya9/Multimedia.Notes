// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";


import 'grommet/scss/vanilla/index.scss';
import Landing from './components/landing/Landing';
import Project from './components/project/Project';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { projectReducer } from './reducers/project';
import { ipcRenderer } from 'electron';
import {IPC_WRITE_REQUEST} from './actions/ipcActions';

const ipcMiddleware = store => next => action => {
    if(action.type.startsWith('IPC_REQUEST')) {
        ipcRenderer.send(action.type, action);
    }
    return next(action);
};

const store = new createStore(projectReducer, applyMiddleware(ipcMiddleware));

var oldEmit = ipcRenderer.emit;
ipcRenderer.emit = (e, s, d) => {
    if(e.startsWith('IPC_RESPONSE') && d) {
        store.dispatch(d);
    }

    oldEmit.apply(ipcRenderer, [e, s, d]);
}

ipcRenderer.on(IPC_WRITE_REQUEST, (e, d) => {
    console.log(e);
    d.measures = store.getState().measures;
    store.dispatch(d);
});

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
