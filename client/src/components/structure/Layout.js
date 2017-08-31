import React from 'react'
import {domainData} from '../../lib/propTypes'
import Header from './Header'
import Footer from './Footer'
import Main from './Main'

const propTypes = {
  domainData
}

const Layout = (props) => (
  <div id='layout'>
    <Header />
    <Main />
    <Footer />
  </div>
)

Layout.propTypes = propTypes

export default Layout
