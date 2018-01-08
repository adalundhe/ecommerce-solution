import PropTypes from 'prop-types'
import React from 'react'
import injectSheet from 'react-jss'
import * as AppPropTypes from '../../../lib/propTypes'
import NavItem from './NavItem'
import HeaderLink from './HeaderLink'

const styles = {
  header: {
    alignItems: 'center',
    backgroundColor: '#3498db',
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
      {props.domainData.loggedOut ? <NavItem to='/signup'>Register</NavItem> : null}
      {props.domainData.loggedOut ? <NavItem to='/login'>Login</NavItem> : null}
      {props.domainData.loggedIn ? <HeaderLink onClick={props.domainData.logoutUser}>Logout</HeaderLink> : null}
      {props.domainData.loggedIn ? <HeaderLink>{props.domainData.user.local.email}</HeaderLink> : null}
    </nav>
  </header>

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  domainData: AppPropTypes.domainData
}

export default enhancer(Header)
