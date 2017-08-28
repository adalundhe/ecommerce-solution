import React from 'react'
import DomainDataProvider from './DomainDataProvider'
import {BrowserRouter} from 'react-router-dom'

const App = () =>
  <BrowserRouter>
    <DomainDataProvider />
  </BrowserRouter>

export default App
