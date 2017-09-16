import PropTypes from 'prop-types'
import React from 'react'
import injectSheet from 'react-jss'

const propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
}

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

const HeaderLink = (props) =>
  <a
    className={props.classes.a}
    onClick={props.onClick}
  >
    {props.children}
  </a>

HeaderLink.propTypes = {
  ...propTypes,
  classes: PropTypes.object.isRequired
}

export default enhancer(HeaderLink)
