import PropTypes from 'prop-types'
import React from 'react'
import { Route, Switch } from 'react-router-dom'

const propTypes = {
  domainData: PropTypes.shape({
    products: PropTypes.array.isRequired
  }).isRequired
}

const Layout = (props) => (
  <div>
    <h1>Hello World</h1>

    <h2>Number of products: {props.domainData.products.length}</h2>
  </div>
)

Layout.propTypes = propTypes

export default Layout
