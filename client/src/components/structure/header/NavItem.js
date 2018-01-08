import PropTypes from 'prop-types'
import React from 'react'
import injectSheet from 'react-jss'
import {NavLink} from 'react-router-dom'

const styles = {
  navLink: {
    display: 'flex',
    justifyContent: 'center',
    minWidth: 100,
    textDecoration: 'none',
    fontSize: 20,
    color: 'white',
    '&:hover': {
      color: 'yellow'
    }
  },
  activeLink: {
    color: '#2c3e50',
    borderBottom: 'solid 3px #2c3e50'
  }
}

const enhancer = injectSheet(styles)

const NavItem = ({to, exact, classes, children}) =>
  <NavLink
    to={to}
    exact={exact}
    className={classes.navLink}
    activeClassName={classes.activeLink}
  >
    {children}
  </NavLink>

NavItem.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired
}

NavItem.defaultProps = {
  exact: false
}

export default enhancer(NavItem)
