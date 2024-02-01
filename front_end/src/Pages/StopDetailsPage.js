import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Components/NavBar";
import StopReviews from "../Components/StopReviews";
import Spinner from 'react-bootstrap/Spinner';


const StopDetails = ({ 
    user, 
    setUser, 
    currentUser, 
    setCurrentUser,
    isLoggedIn, 
    setIsLoggedIn, 
    loading,
    setLoading
}) => {
    let { stopId } = useParams(); 
    const [stop, setStop] = useState([]); 
    const [inputs, setInputs] = useState({});
    const [updateReviews, setUpdateReviews] = useState(false);
    let [userRating, setUserRating] = useState("");
   
    useEffect(() => {
        fetch(`/stops/${stopId}`) 
            .then((response) => response.json())
            .then((stopData) => {
                console.log('stopData:', stopData);
                setStop(stopData);
            }) 
            .catch((error) => console.log(error));
    }, [stopId, updateReviews]); 

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    const handleAddReview = (e) => {
        e.preventDefault();
        const reviewInfo = {
            userId: currentUser,
            stopId: stopId,
            rating: userRating,
            content: inputs.content
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(reviewInfo)
        }

        fetch(`/stops/${stopId}/review`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setUpdateReviews(true);
            })
            .catch((error) => console.log(error));
    }
    
    return ( 
        <div className="stop-page">
            <Navbar 
                user={user}
                setUser={setUser} 
                currentUser={currentUser}
                setCurrentUser={setCurrentUser} 
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn} 
            />
            {loading ? <Spinner animation="border" /> :
                <div className="stop-details-page-content container" id="stop-details">
                        <div className="row stop-info">
                            <h1>{ stop.stop_name }</h1>
                            <p>Category: { stop.stop_category }</p>
                            <p>Latitude: { stop.stop_lat}</p>
                            <p>Longitude: { stop.stop_lng }</p>
                            {stop.rating  ? (<p>Rating: {stop.rating}</p>): null} 
                        </div>
                        <div className="row">
                            <div className="create-review col-md-6">
                                <h2>Leave a Review</h2>
                                <form className="create-review-form" onSubmit={handleAddReview}>
                                    <label 
                                        htmlFor="review-rating-input" 
                                        className="create-review-form-input"
                                    >
                                        Rating
                                    <select 
                                        name="rating" 
                                        id="review-rating-select"
                                        value={userRating}
                                        onChange={(e) => {
                                            userRating = e.target.value;
                                            setUserRating(userRating);
                                        }}
                                        required
                                    >
                                        <option disabled={true} value="">Choose a number between 1-5</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                    </label>
                                    <label 
                                        htmlFor="review-text-input" 
                                        className="create-review-form-input"
                                    >
                                        Review
                                    </label>
                                    <textarea 
                                        type="textArea" 
                                        name="content"
                                        id="review-text-input"
                                        value={inputs.content || ""}
                                        onChange={handleChange} 
                                        maxLength="500"
                                        spellCheck="true"
                                        placeholder="Tell other travelers why you love it (or don't!)"
                                        required 
                                    />
                                    <button>Create Review</button>
                                </form>
                            </div>
                            <div className="col-md-6">
                                <StopReviews updateReviews={updateReviews} />
                            </div>
                        </div>
                </div>
            }
        </div>
    );
}
 
export default StopDetails;



