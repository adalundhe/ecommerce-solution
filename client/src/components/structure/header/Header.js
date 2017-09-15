import PropTypes from 'prop-types'
import React from 'react'
import injectSheet from 'react-jss'
import NavItem from './NavItem'

const styles = {
  header: {
    alignItems: 'center',
    backgroundColor: 'purple',
    display: 'flex',
    height: 50,
    justifyContent: 'center',
    left: 0,
    paddingLeft: 20,
    paddingRight: 20,
    position: 'fixed',
    right: 0,
    top: 0
  },
  nav: {
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row'
  }
}

const enhancer = injectSheet(styles)

const Header = (props) =>
  <header className={props.classes.header}>
    <nav className={props.classes.nav}>
      <NavItem exact to='/'>Home</NavItem>
      <NavItem to='/about'>About</NavItem>
      <NavItem to='/products'>Products</NavItem>
      <NavItem to='/signup'>Register</NavItem>
      <NavItem to='/login'>Login</NavItem>
    </nav>
  </header>

Header.propTypes = {
  classes: PropTypes.object.isRequired
}

export default enhancer(Header)
