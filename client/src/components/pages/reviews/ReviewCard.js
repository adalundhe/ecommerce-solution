import React from 'react'
import Button from 'material-ui/Button'

const ReviewCard = ({review, user, onDelete, selectReview}) =>
    <div>
        <h3>From: {review.user.local.firstName + ' ' + review.user.local.lastName}</h3>
        <h3>Rating: {review.rating}</h3>
        <div>
            <p>{review.comment}</p>
        </div>
        <div>
            {
                user && user._id === review.user._id ?
                    <div>
                        <Button raised onClick={selectReview}>Edit Comment</Button>
                        <Button raised onClick={onDelete}>Delete Comment</Button>
                    </div>
                    : null
            }
        </div>
    </div>

export default ReviewCard