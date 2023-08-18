import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const StopReviews = ({ currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn }) => {
    const [userReviews, setUserReviews] = useState([]); 
   
    useEffect(() => {
        fetch(`/api/user/${currentUser}/reviews`) 
            .then(response => response.json())
            .then(data => {setUserReviews(data)}) 
            .catch(error => console.log(error));
    }, [currentUser]); 

    console.log('value of currentUser on MyReviews', currentUser);
    const userReviewsObj = Object.entries(userReviews).map(([key, value]) => ({key, value}));

    return ( 
        <div className="my-reviews">
            {(userReviewsObj.length === 0) && "Visit a stop and leave a review!" }
            {userReviewsObj.map((userReviewObj) => (
                <div className="user-review-preview rounded" key={ userReviewObj.key }>
                    {/* <Link to={`/stops/${userReviewObj.value.stop_id}`}> */}
                        <h2>{ userReviewObj.value.stop_name }</h2>
                        <p>{ userReviewObj.value.stop_category }</p>
                        <h3>Your Review:</h3>
                        <p>Rating: { userReviewObj.value.rating }</p>
                        <p>{ userReviewObj.value.content }</p>
                    {/* </Link> */}
                </div>
            ))}
        </div>
     );
}
 
export default StopReviews;