import PropTypes from 'prop-types'
import React from 'react'
import injectSheet from 'react-jss'
import {Link} from 'react-router-dom'
import Typography from 'material-ui/Typography'
// https://material-ui-next.com/style/typography/
import Button from 'material-ui/Button'
// https://material-ui-next.com/demos/buttons/
import Card from 'material-ui/Card'

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20
  },
  fieldContainer: {
    width: '100%',
    marginBottom: 10,
    display: 'flex',
    justifyContent: 'space-between'
  }
}

const enhancer = injectSheet(styles)

const ReviewForm = ({classes, onSubmit, onChange, setRating, comment, rating, commentId}) =>
  <div className={classes.container}>
    <Card>
      {commentId ? <h3> Editing Enabled: </h3> : null}
      <form className={classes.formContainer}>
        <Typography type='display1' gutterBottom>
          Review Product
        </Typography>
        <div className={classes.fieldContainer}>
          <Typography type='subheading' gutterBottom>
          Comment
          </Typography>
          <input type='text' onChange={(event) => onChange(event.target.value)} value={comment} />
        </div>
        <div className={classes.fieldContainer}>
          <Typography type='subheading' gutterBottom>
            Rating
          </Typography>
          <input type='number' onChange={(event) => setRating(event.target.value)} max={5} min={1} value={rating} style={{width: '69%'}} />
        </div>
        <div className={classes.fieldContainer}>
          <Button onClick={onSubmit} raised> Submit Review </Button>
          <Link to='/products'>Cancel</Link>
        </div>
      </form>
    </Card>
  </div>

ReviewForm.propTypes = {
  comment: PropTypes.string.isRequired,
  classes: PropTypes.object,
  rating: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  setRating: PropTypes.func.isRequired
}

export default enhancer(ReviewForm)
