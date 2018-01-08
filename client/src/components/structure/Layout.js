import React from 'react'
import * as AppPropTypes from '../../lib/propTypes'
import Header from './header/Header'
import Footer from './Footer'
import Main from './Main'

const Layout = ({domainData}) => (
  <div id='layout'>
    <Header domainData={domainData} />
    <Main domainData={domainData} />
    <Footer />
  </div>
)

Layout.propTypes = {
  domainData: AppPropTypes.domainData
}

export default Layout
