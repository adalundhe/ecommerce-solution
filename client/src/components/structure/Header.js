import React from 'react'
import {Link, withRouter} from 'react-router-dom'

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
  },
  link: {
    padding: 5
  }
}

const Header = ({history}) =>
  <header style={styles.header}>
    <nav>
      <Link to='/' style={styles.link}>Home</Link>
      <Link to='/about' style={styles.link}>About</Link>
      <button onClick={() => history.push('/')}>Home</button>
      <button onClick={() => history.push('/about')}>About</button>
    </nav>
  </header>

export default withRouter(Header)
