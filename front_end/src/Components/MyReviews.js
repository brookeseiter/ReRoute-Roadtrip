import { useState, useEffect } from "react";

const StopReviews = () => {
    const [userReviews, setUserReviews] = useState([]); 

    useEffect(() => {
        const user_id = sessionStorage.user_id

        fetch(`/api/user/${user_id}/reviews`) 
            .then(response => response.json())
            .then(data => {setUserReviews(data)}) 
            .catch(error => console.log(error));
    }, []); 

    const userReviewsObj = Object.entries(userReviews).map(([key, value]) => ({key, value}))

    return ( 
        <div className="StopReviewDetails">
            <article>
            <h2>Reviews</h2>
                {(userReviewsObj.length === 0) && "Visit a stop and leave a review!" }
                {userReviewsObj.map((userReviewObj) => (
                    <div className="user-review-preview" key={ userReviewObj.key }>
                            <p>Rating: { userReviewObj.value.rating }</p>
                            <p>{ userReviewObj.value.content }</p>
                            <br></br>
                    </div>
                ))}
            </article>
        </div>
     );
}
 
export default StopReviews;