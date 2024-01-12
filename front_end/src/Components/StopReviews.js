import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// const StopReviews = ({ handleRatingChange }) => {
// const StopReviews = ({ setRating, reviewsObj, setReviewsObj }) => {
// const StopReviews = ({ setRating }) => {
//     let { stopId } = useParams(); 
//     const [reviews, setReviews] = useState({}); 
//     // let [reviewsObj, setReviewsObj] = useState({});

//     useEffect(() => {
//         fetch(`/stops/${stopId}/reviews`) 
//             .then((response) => response.json())
//             .then((data) => {
//                 console.log('data:', data);
//                 console.log('typeOfdata:', typeof(data));
//                 setRating(data[0]);
//                 setReviews(data.slice(1)); 
//                 console.log('date.slice(1):', data.slice(1));
//                 console.log('1:', typeof(reviewsObj));
//                 console.log('reviews:', reviews);
//                 // setReviewsObj(Object.entries(reviews).map(([key, value]) => ({key, value})));
//             }) 
//             .catch(error => console.log(error));
//     }, [stopId]); 
    
//     console.log('reviews:', reviews);
//     const reviewsObj = Object.entries(reviews).map(([key, value]) => ({key, value}));
//     console.log('reviewsObj:', reviewsObj);
//     console.log(typeof(reviewsObj));
//     console.log(reviewsObj.length);
//     // console.log('avgRating:', avgRating);
//     // console.log(reviewsObj.value.content);

//     // if (reviewsObj.length !== 0) {
//     //     console.log(reviewsObj.map((reviewObj) );
//     // }

    

//     return ( 
//         <div className="stop-review-details">
//             <h2>Reviews</h2>
//             {(reviews.length === 0) && "Be the first to leave a review!" }
//             {/* {(reviewsObj.length !== 0) && reviewsObj.map((reviewObj) => (
//                 <div className="review-preview" key={ reviewObj.key }>
//                         <p>Username: { reviewObj.value.username }</p>
//                         <p>Rating: { reviewObj.value.rating }</p>
//                         <p>{ reviewObj.value.content }</p>
//                         <br></br>
//                 </div>
//             ))} */}
//             {(reviewsObj.length !== 0) && reviewsObj.map((reviewObj) => (
//                 <div className="review-preview" key={ reviewObj.key }>
//                         {/* <p>{reviewObj.value}</p> */}
//                         <p>Username: { reviewObj.value.username }</p>
//                         <p>Rating: { reviewObj.value.rating }</p>
//                         <p>{ reviewObj.value.content }</p>
//                         <br></br>
//                 </div>
//             ))}
            
//         </div>
//      );
// }
 
// export default StopReviews;



// OG
// const StopReviews = ({ handleRatingChange }) => {
//     let { stopId } = useParams(); 
//     const [reviews, setReviews] = useState([]); 
//     let [reviewsObj, setReviewsObj] = useState([]);

//     useEffect(() => {
//         fetch(`/stops/${stopId}/reviews`) 
//             .then((response) => response.json())
//             .then((data) => {
//                 setReviews(data); 
//                 setReviewsObj(Object.entries(reviews).map(([key, value]) => ({key, value})));
//                 const ratingArray = [];
//                 if (!Object.keys(data).length) {
//                     handleRatingChange(null);
//                 } else {
//                 for (const review of reviewsObj) {
//                     const rating = parseInt(review.value.rating);
//                     ratingArray.push(rating);
//                 }
//                 console.log(ratingArray);
//                 let ratingSum = 0;
//                 let lenRatingArray = 0;
//                 ratingArray.forEach( rating => {
//                     ratingSum += rating;
//                     lenRatingArray += 1;
//                 });
//                 const avgRating = parseFloat(ratingSum/lenRatingArray).toFixed(1);
//                 console.log(avgRating);
//                 handleRatingChange(avgRating);
//                 }
//             }) 
//             .catch(error => console.log(error));
//     }, [stopId, handleRatingChange]); 
//     console.log('reviews:', reviews);
//     reviewsObj = Object.entries(reviews).map(([key, value]) => ({key, value}));
//     console.log('reviewsObj:', reviewsObj);

//     return ( 
//         <div className="stop-review-details">
//             <h2>Reviews</h2>
//             {(reviewsObj.length === 0) && "Be the first to leave a review!" }
//             {reviewsObj.map((reviewObj) => (
//                 <div className="review-preview" key={ reviewObj.key }>
//                         <p>Username: { reviewObj.value.username }</p>
//                         <p>Rating: { reviewObj.value.rating }</p>
//                         <p>{ reviewObj.value.content }</p>
//                         <br></br>
//                 </div>
//             ))}
//         </div>
//      );
// }
 
// export default StopReviews;

// const StopReviews = ({ handleRatingChange }) => {
const StopReviews = ({ setUpdateReviews }) => {
    let { stopId } = useParams(); 
    const [reviews, setReviews] = useState([]); 
    let [reviewsObj, setReviewsObj] = useState([]);

    useEffect(() => {
        fetch(`/stops/${stopId}/reviews`) 
            .then((response) => response.json())
            .then((data) => {
                setReviews(data); 
                setReviewsObj(Object.entries(reviews).map(([key, value]) => ({key, value})));
                setUpdateReviews(true);
            }) 
            .catch(error => console.log(error));
    // }, [stopId, handleRatingChange]); 
    }, [stopId]); 
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

