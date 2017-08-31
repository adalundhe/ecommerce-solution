import PropTypes from 'prop-types'
import React from 'react'
import {NavLink} from 'react-router-dom'

const propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired
}

const styles = {
  navLink: {
    textDecoration: 'none',
    fontSize: 20,
    color: 'white',
    paddingRight: '20px'
  },
  activeLink: {
    color: 'orange'
  }
}

const NavItem = (props) =>
  <NavLink
    to={props.to} style={styles.navLink} activeStyle={styles.activeLink}>{props.children}</NavLink>

NavItem.propTypes = propTypes

export default NavItem
