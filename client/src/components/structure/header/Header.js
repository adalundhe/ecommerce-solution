import React from 'react'
import NavItem from './NavItem'

const styles = {
  header: {
    alignItems: 'center',
    backgroundColor: 'green',
    display: 'flex',
    height: 50,
    left: 0,
    paddingLeft: 20,
    paddingRight: 20,
    position: 'fixed',
    right: 0,
    top: 0
  }
}

const Header = (props) =>
  <header style={styles.header}>
    <nav>
      <NavItem to='/'>Home</NavItem>
      <NavItem to='/about'>About</NavItem>
      <NavItem to='/products'>Products</NavItem>
      <NavItem to='/signup'> Register </NavItem>
      <NavItem to='/login'> Login </NavItem>
    </nav>
  </header>

export default Header
