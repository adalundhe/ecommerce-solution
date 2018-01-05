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

const About = ({classes}) =>
  <div className={classes.container}>
    <Card>
      <div className={classes.contentContainer}>
        <Typography type='display1' gutterBottom className={classes.subheader}>
          Mock e-commerce project built for Big Sky Code Academy
        </Typography>
      </div>
    </Card>
  </div>

About.propTypes = {
  classes: PropTypes.object
}

export default enhancer(About)
