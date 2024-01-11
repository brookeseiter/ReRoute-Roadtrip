import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const StopReviews = ({ handleRatingChange }) => {
    let { stopId } = useParams(); 
    const [reviews, setReviews] = useState([]); 
    let [reviewsObj, setReviewsObj] = useState([]);

    useEffect(() => {
        fetch(`/stops/${stopId}/reviews`) 
            .then((response) => response.json())
            .then((data) => {
                setReviews(data); 
                setReviewsObj(Object.entries(reviews).map(([key, value]) => ({key, value})));
                const ratingArray = [];
                if (!Object.keys(data).length) {
                    handleRatingChange(null);
                } else {
                for (const review of reviewsObj) {
                    const rating = parseInt(review.value.rating);
                    ratingArray.push(rating);
                }
                console.log(ratingArray);
                let ratingSum = 0;
                let lenRatingArray = 0;
                ratingArray.forEach( rating => {
                    ratingSum += rating;
                    lenRatingArray += 1;
                });
                const avgRating = parseFloat(ratingSum/lenRatingArray).toFixed(1);
                console.log(avgRating);
                handleRatingChange(avgRating);
                }
            }) 
            .catch(error => console.log(error));
    }, [stopId, handleRatingChange]); 
    console.log('reviews:', reviews);
    reviewsObj = Object.entries(reviews).map(([key, value]) => ({key, value}));
    console.log('reviewsObj:', reviewsObj);

    return ( 
        <div className="stop-review-details">
            <h2>Reviews</h2>
            {(reviewsObj.length === 0) && "Be the first to leave a review!" }
            {reviewsObj.map((reviewObj) => (
                <div className="review-preview" key={ reviewObj.key }>
                        <p>Username: { reviewObj.value.username }</p>
                        <p>Rating: { reviewObj.value.rating }</p>
                        <p>{ reviewObj.value.content }</p>
                        <br></br>
                </div>
            ))}
        </div>
     );
}
 
export default StopReviews;

