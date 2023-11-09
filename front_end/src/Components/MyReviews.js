import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";


const StopReviews = ({ currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn }) => {
    const [userReviews, setUserReviews] = useState([]); 
    const [modalOpen, setModalOpen] = useState(false);
   
    useEffect(() => {
        if (currentUser.userId !== '') {
            fetch(`/api/user/${currentUser}/reviews`) 
                .then(response => response.json())
                .then(data => {setUserReviews(data)}) 
                .catch(error => console.log(error));
        }
    }, [currentUser]); 

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

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
            <button onClick={handleOpenModal}>Edit Review</button>
            {modalOpen && (
                <>
                <Modal show={modalOpen} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                  <button variant="secondary" >
                    Close
                  </button>
                </Modal.Footer>
              </Modal>
              </>
            )}
        </div>
     );
}
 
export default StopReviews;