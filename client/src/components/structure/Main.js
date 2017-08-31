import React from 'react'
import {Route} from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'

const styles = {
  main: {
    position: 'fixed',
    top: 50,
    bottom: 25,
    left: 0,
    right: 0,
    backgroundColor: 'lightblue',
    overflow: 'scroll'
  }
}

const Main = () =>
  <main style={styles.main}>
    <h1>Main</h1>

    <Route path='/' exact component={Home} />
    <Route path='/about' component={About} />
  </main>

export default Main
