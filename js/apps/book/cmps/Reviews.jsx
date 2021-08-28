import { Review } from './Review.jsx'
import { bookService } from '../services/book.service.js'

export function Reviews({ reviews, onRemoveReview }) {
    return (
        <section className="reviews-container">
            <h3>Reviews:</h3>
            {reviews &&
                reviews.map(review => {
                    return <Review key={review.id} review={review} onRemoveReview={onRemoveReview} />
                })}
            {(!reviews || !reviews.length) && <p>No reviews to show...</p>}
        </section>
    )
}
