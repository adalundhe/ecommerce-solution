import PropTypes from 'prop-types'
import React from 'react'
import injectSheet from 'react-jss'
import {NavLink} from 'react-router-dom'

const propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired
}

const defaultProps = {
  exact: false
}

const styles = {
  navLink: {
    textDecoration: 'none',
    fontSize: 20,
    color: 'white',
    paddingRight: '20px',
    '&:hover': {
      color: 'yellow'
    }
  },
  activeLink: {
    color: 'orange'
  }
}

const enhancer = injectSheet(styles)

const NavItem = (props) =>
  <NavLink
    to={props.to}
    exact={props.exact}
    className={props.classes.navLink}
    activeClassName={props.classes.activeLink}
  >
    {props.children}
  </NavLink>

NavItem.propTypes = {
  ...propTypes,
  classes: PropTypes.object.isRequired
}

NavItem.defaultProps = defaultProps

export default enhancer(NavItem)
