import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";


const StopReviews = ({ currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn, loading, setLoading }) => {
    const [userReviews, setUserReviews] = useState([]); 
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedReview, setSelectedReview] = useState({});
    const [rating, setRating] = useState('');
    const [content, setContent] = useState('');
    const [editSuccess, setEditSuccess] = useState(false);

   
    useEffect(() => {
        if (currentUser.userId !== '') {
            fetch(`/api/user/${currentUser}/reviews`) 
                .then(response => response.json())
                .then(data => setUserReviews(data)) 
                .catch(error => console.log(error));
        }
        setEditSuccess(false);
    }, [currentUser, editSuccess]); 

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);
    const updateRating = (e) => setRating(e.target.value);
    const updateContent = (e) => setContent(e.target.value);

    const userReviewsObj = Object.entries(userReviews).map(([key, value]) => ({key, value}));
    console.log('userReviews:  ', userReviews);
    console.log('userReviewsObj:  ', userReviewsObj);

    const handleEditReview = (e) => {
        e.preventDefault();
        const updateReviewInfo = {
            reviewId: selectedReview.value.review_id,
            userId: currentUser,
            stopId: selectedReview.value.stop_id,
            rating: rating,
            content: content
        }

        const requestOptions = {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateReviewInfo)
        }

        fetch(`/user/${currentUser}/${selectedReview.value.review_id}/edit`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setEditSuccess(true);
            })
            .catch((error) => console.log(error));
            handleCloseModal();
    }

    return ( 
        <div className="my-reviews">
            {(userReviewsObj.length === 0) && <p className="empty-reviews">Visit a stop and leave a review</p> }
            {userReviewsObj.map((userReviewObj) => (
                <div className="user-review-preview rounded" key={ userReviewObj.key }>
                    <Link to={`/stops/${userReviewObj.value.stop_id}`}>
                        <h2>{ userReviewObj.value.stop_name }</h2>
                        <p><strong>Category: </strong><em>{ userReviewObj.value.stop_category }</em></p>
                        <h3>Your Review:</h3>
                        <p>Rating: { userReviewObj.value.rating }</p>
                        <p>{ userReviewObj.value.content }</p>
                    </Link>
                    <button onClick={() => {
                        handleOpenModal();
                        setSelectedReview(userReviewObj);  
                        setRating(userReviewObj.value.rating);
                        setContent(userReviewObj.value.content);
                    }}>
                        Edit Review
                    </button>
                </div>
            ))}
            {modalOpen && (
                <>
                <Modal show={modalOpen} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                  <Modal.Title>{selectedReview.value.stop_name}</Modal.Title>
                </Modal.Header>
                <form className="edit-review-form" onSubmit={handleEditReview}>
                    <Modal.Body >
                        <label 
                            htmlFor="review-rating-input" 
                            className="edit-review-form-input"
                        >
                            Rating
                        </label>
                        <select
                            type="number"
                            name="rating"
                            id="edit-review-rating-input"
                            defaultValue={selectedReview.value.rating}
                            onChange={updateRating}
                            required
                        > 
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </Modal.Body>
                    <Modal.Body>
                        <label 
                            htmlFor="review-content-input" 
                            className="edit-review-form-input"
                        >
                            Review
                        </label>
                        <textarea
                            type="textArea"
                            name="content"
                            id="edit-review-text-input"
                            maxLength="500"
                            spellCheck="true"
                            rows="10"
                            cols="50"
                            defaultValue={selectedReview.value.content}
                            onChange={updateContent}
                            required
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="submit">Update Review</button>
                    </Modal.Footer>
                </form>
              </Modal>
              </>
            )}
        </div>
    );
}
 
export default StopReviews;