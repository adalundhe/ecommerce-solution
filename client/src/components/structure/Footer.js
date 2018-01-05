import React from 'react'

const styles = {
  footer: {
    height: 25,
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#2980b9',
    paddingLeft: 20,
    paddingRight: 20
  },
  p: {
    color: 'white'
  }
}

const Footer = () =>
  <footer style={styles.footer}>
    <p style={styles.p}>Thank you for shopping!</p>
  </footer>

export default Footer
