import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


const StopReviews = ({ updateReviews }) => {
    let { stopId } = useParams(); 
    const [reviews, setReviews] = useState([]); 
    let [reviewsObj, setReviewsObj] = useState([]);

    useEffect(() => {
        fetch(`/stops/${stopId}/reviews`) 
            .then((response) => response.json())
            .then((data) => {
                setReviews(data); 
                setReviewsObj(Object.entries(reviews).map(([key, value]) => ({key, value})));
            }) 
            .catch(error => console.log(error));
    }, [stopId, updateReviews]); 
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

