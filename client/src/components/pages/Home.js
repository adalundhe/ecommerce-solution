import React from 'react'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import Typography from 'material-ui/Typography'
// https://material-ui-next.com/style/typography/
import Card from 'material-ui/Card'

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20
  },
  subheader: {
    color: '#8e44ad !important'
  }
}

const enhancer = injectSheet(styles)

const Home = ({classes}) =>
  <div className={classes.container}>
    <Card>
      <div className={classes.contentContainer}>
        <Typography type='display4' gutterBottom>
        Zamazon
        </Typography>
        <Typography type='display1' gutterBottom className={classes.subheader}>
        Amazon - with a <span role='img' aria-label='emoji'>  ⚡ </span>️
        </Typography>
      </div>
    </Card>
  </div>

Home.propTypes = {
  classes: PropTypes.object
}

export default enhancer(Home)
