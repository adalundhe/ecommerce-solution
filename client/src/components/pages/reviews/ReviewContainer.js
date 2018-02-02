import React, {Component} from 'react'
import ReviewForm from './ReviewForm'
import ReviewList from './ReviewList'
import Button from 'material-ui/Button'
import { product } from '../../../lib/propTypes';

class ReviewContainer extends Component{
    state = {
        comment: '',
        rating: 1,
        showReviews: false,
        commentId: null
    }
    componentDidMount = () => this.props.getProductReviews(this.props.product)
    setRating = (val) => (1 <= val && val <= 5) ? this.setState({rating: val}) : this.setState({rating: this.state.rating})
    onChange = (text) => this.setState({comment: text}) 
    selectReview = (commentId) => {
        const selectedId = !this.state.commentId ? commentId: null 
        const review = this.props.product.reviews.filter(review => review._id === selectedId)[0]
        if (review) {
            this.setState({commentId: selectedId, comment: review.comment, rating: review.rating})
        } else {
            this.setState({commentId: null, comment: '', rating: 1})
        }
        
    }
    onSubmit = (edit) => {
        if (!edit) {
            this.props.submitReview(this.state.comment, this.state.rating, this.props.product._id)
        } else {
            const review = this.props.product.reviews.filter(review => review._id === this.state.commentId)[0]
            review.comment = this.state.comment
            review.rating = this.state.rating
            this.props.editReview(review, this.props.product)
            this.setState({commentId: null, comment: '', rating: 1})
        }
        
    }
    onDelete = (review) => {
        this.props.deleteReview(review, this.props.product._id)
    }
    showReviews = () =>  {
        if(!this.state.showReviews){
            this.props.getProductReviews(this.props.product)
        }
        this.setState({showReviews: !this.state.showReviews})
    }
    render (){
        return(
            <div>
                {
                    this.props.loggedIn ?
                    <ReviewForm
                        onChange={this.onChange} onSubmit={() => this.onSubmit(this.state.commentId)} 
                        setRating={this.setRating} rating={this.state.rating} comment={this.state.comment}
                        commentId={this.state.commentId}
                    />
                    : null
                }
                <Button raised onClick={() => this.showReviews()}>Show Reviews</Button>
                {this.state.showReviews ? <ReviewList reviews={this.props.product.reviews} 
                                            user={this.props.user} onDelete={this.onDelete}
                                            selectReview={this.selectReview}
                                            /> : null}
            </div>
        )
    }
}

export default ReviewContainer