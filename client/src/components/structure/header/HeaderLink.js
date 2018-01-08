import PropTypes from 'prop-types'
import React from 'react'
import injectSheet from 'react-jss'

const styles = {
  a: {
    textDecoration: 'none',
    fontSize: 20,
    color: 'white',
    paddingRight: '20px',
    '&:hover': {
      color: 'yellow'
    }
  }
}

const enhancer = injectSheet(styles)

const HeaderLink = ({classes, onClick, children}) =>
  <a
    className={classes.a}
    onClick={onClick}
  >
    {children}
  </a>

HeaderLink.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  classes: PropTypes.object.isRequired
}

export default enhancer(HeaderLink)
