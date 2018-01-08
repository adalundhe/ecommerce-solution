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

const Header = ({classes, domainData}) =>
  <header className={classes.header}>
    <nav className={classes.nav}>
      <NavItem exact to='/'>Home</NavItem>
      <NavItem to='/about'>About</NavItem>
      <NavItem to='/products'>Products</NavItem>
      {domainData.loggedOut ? <NavItem to='/signup'>Register</NavItem> : null}
      {domainData.loggedOut ? <NavItem to='/login'>Login</NavItem> : null}
      {domainData.loggedIn ? <HeaderLink onClick={domainData.logoutUser}>Logout</HeaderLink> : null}
      {domainData.loggedIn ? <HeaderLink>{domainData.user.local.email}</HeaderLink> : null}
    </nav>
  </header>

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  domainData: AppPropTypes.domainData
}

export default enhancer(Header)
