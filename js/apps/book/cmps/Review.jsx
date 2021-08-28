export function Review({ review, onRemoveReview }) {

    return (
        <div className="review-card">
            <button onClick={() => onRemoveReview(review.id)}>x</button>
            <h4>{review.userName}</h4>
            <h5>{review.rating}</h5>
            <p>{review.readAt}</p>
            <p>{review.txt}</p>
        </div>
    )
}