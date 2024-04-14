import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PaginationComp from '../Components/Pagination.js';
import Spinner from 'react-bootstrap/Spinner';

// Chatgpt V1= functional
const StopReviews = ({ updateReviews }) => {
    let { stopId } = useParams(); 
    const [reviews, setReviews] = useState([]); 
    let [reviewsObj, setReviewsObj] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [reviewsPerPage] = useState(3);
    const [loading, setLoading] = useState(true);

    const fetchReviewData = () => {
        setLoading(true);
        // const delay = setTimeout(() => {
            fetch(`/stops/${stopId}/reviews`) 
                .then((response) => response.json())
                .then((reviewData) => {
                    console.log('stopData uE3:', reviewData);
                    setReviews(reviewData); 
                    setReviewsObj(Object.entries(reviewData).map(([key, value]) => ({key, value})));
                    setLoading(false);
                }) 
                .catch(error => console.log(error));
        // }, 3000);
        // return () => clearTimeout(delay);
    }

    useEffect(() => {
        fetchReviewData();
    }, [stopId, updateReviews]); 

    if (loading) {
        return <Spinner className='spinner' animation="border" />;
    }

    if (reviewsObj.length === 0) {
        return (
            <div className="stop-review-details">
                <h2>Reviews</h2>
                Be the first to leave a review!
            </div>
        )
    }

    // Get current reviews
    const idxOfLastReview = currentPage * reviewsPerPage;
    const idxOfFirstReview = idxOfLastReview - reviewsPerPage;
    const currentReviews = reviewsObj.slice(idxOfFirstReview, idxOfLastReview);

    return ( 
        <div className="stop-review-details">
            <h2>Reviews</h2>
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






