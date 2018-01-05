import React from 'react'
import {Route} from 'react-router-dom'
import * as AppPropTypes from '../../lib/propTypes'
import Home from '../pages/Home'
import About from '../pages/About'
import Products from '../pages/products/Products'
import Signup from '../pages/authentication/SignupContainer'
import Login from '../pages/authentication/LoginContainer'

const propTypes = {
  domainData: AppPropTypes.domainData
}

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

const Main = (props) =>
  <main style={styles.main}>
    <Route path='/' exact component={Home} />
    <Route path='/about' component={About} />
    <Route path='/products' render={() => <Products domainData={props.domainData} />} />
    <Route path='/login' render={() => <Login domainData={props.domainData} />} />
    <Route path='/signup' render={() => <Signup domainData={props.domainData} />} />
  </main>

Main.propTypes = propTypes

export default Main
