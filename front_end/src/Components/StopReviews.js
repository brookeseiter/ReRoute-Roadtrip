import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const StopReviews = ({ setUpdateReviews }) => {
    let { stop_id } = useParams(); 
    const [reviews, setReviews] = useState([]); 

    useEffect(() => {
        fetch(`/api/stops/${stop_id}/reviews`) 
            .then(response => response.json())
            .then(data => {setReviews(data)}) 
            .catch(error => console.log(error));
    }, [stop_id]); 

    const reviewsObj = Object.entries(reviews).map(([key, value]) => ({key, value}))
    console.log(reviewsObj);

    return ( 
        <div className="StopReviewDetails">
            <article>
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
            </article>
        </div>
     );
}
 
export default StopReviews;