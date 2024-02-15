import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PaginationComp from '../Components/Pagination.js';


const StopReviews = ({ updateReviews }) => {
    let { stopId } = useParams(); 
    const [reviews, setReviews] = useState([]); 
    let [reviewsObj, setReviewsObj] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [reviewsPerPage] = useState(3);

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

    // Get current reviews
    const idxOfLastReview = currentPage * reviewsPerPage;
    const idxOfFirstReview = idxOfLastReview - reviewsPerPage;
    const currentReviews = reviewsObj.slice(idxOfFirstReview, idxOfLastReview);

    return ( 
        <div className="stop-review-details">
            <h2>Reviews</h2>
            {(currentReviews.length === 0) && "Be the first to leave a review!" }
            {currentReviews.map((currentReview) => (
                <div className="review-preview" key={ currentReview.key }>
                        <p>Username: { currentReview.value.username }</p>
                        <p>Rating: { currentReview.value.rating }</p>
                        <p>{ currentReview.value.content }</p>
                        <br></br>
                </div>
            ))}
            <PaginationComp
                itemsPerPage={reviewsPerPage} 
                totalItems={reviewsObj.length}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                alwaysShown={false}
            />
        </div>
    );
}
 
export default StopReviews;

// const StopReviews = ({ updateReviews }) => {
//     let { stopId } = useParams(); 
//     const [reviews, setReviews] = useState([]); 
//     let [reviewsObj, setReviewsObj] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [reviewsPerPage] = useState(3);

//     useEffect(() => {
//         fetch(`/stops/${stopId}/reviews`) 
//             .then((response) => response.json())
//             .then((data) => {
//                 setReviews(data); 
//                 setReviewsObj(Object.entries(reviews).map(([key, value]) => ({key, value})));
//             }) 
//             .catch(error => console.log(error));
//     }, [stopId, updateReviews]); 
//     console.log('reviews:', reviews);
//     reviewsObj = Object.entries(reviews).map(([key, value]) => ({key, value}));
//     console.log('reviewsObj:', reviewsObj);

//     // Get current reviews
//     const idxOfLastReview = currentPage * reviewsPerPage;
//     const idxOfFirstReview = idxOfLastReview - reviewsPerPage;
//     const currentReviews = reviewsObj.slice(idxOfFirstReview, idxOfLastReview);

//     return ( 
//         <div className="stop-review-details">
//             <h2>Reviews</h2>
//             {(currentReviews.length === 0) && "Be the first to leave a review!" }
//             {currentReviews.map((currentReview) => (
//                 <div className="review-preview" key={ currentReview.key }>
//                         <p>Username: { currentReview.value.username }</p>
//                         <p>Rating: { currentReview.value.rating }</p>
//                         <p>{ currentReview.value.content }</p>
//                         <br></br>
//                 </div>
//             ))}
//             <PaginationComp
//                 itemsPerPage={reviewsPerPage} 
//                 totalItems={reviewsObj.length}
//                 currentPage={currentPage}
//                 setCurrentPage={setCurrentPage}
//                 alwaysShown={false}
//             />
//         </div>
//      );
// }
 
// export default StopReviews;

