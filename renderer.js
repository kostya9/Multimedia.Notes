// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

import React from 'react'
import ReactDOM from 'react-dom'

import 'grommet/scss/vanilla/index.scss';
import Landing from './components/landing/Landing';

class App extends React.Component {
  render () {
    return (
      <Landing></Landing>
    )
  }
}

ReactDOM.render(<App/>,document.getElementById('app'))
