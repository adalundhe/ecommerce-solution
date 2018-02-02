import React from 'react'
import ReviewCard from './ReviewCard'

const ReviewList = ({ reviews, user, onDelete, selectReview }) =>
    <div>
        {
            reviews.length > 0 ?
            reviews.map((review, _id) => <ReviewCard key={_id} review={review} user={user} 
                                            onDelete={() => onDelete(review)} selectReview={() => selectReview(review._id)}/>)
            : <h3>This product has no reviews yet.</h3>
        }
    </div>

export default ReviewList