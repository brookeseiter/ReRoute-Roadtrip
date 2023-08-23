import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Components/NavBar";
import StopReviews from "../Components/StopReviews";

const StopDetails = ({ currentUser, user, setUser, isLoggedIn, setisLoggedIn }) => {
    let { stopId } = useParams(); 
    const [stop, setStop] = useState([]); 
    const [updateRating, setUpdateRating] = useState('');

    const handleRatingChange = avgRating => {
        console.log(avgRating);
        setUpdateRating(avgRating);
    }
   
    useEffect(() => {
        fetch(`/api/stops/${stopId}`) 
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setStop(data);
            }) 
            .catch((error) => console.log(error));
    }, [stopId]); 

    const [inputs, setInputs] = useState({});

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const reviewInfo = {
            userId: currentUser,
            stopId: stopId,
            rating: inputs.rating,
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
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setUpdateRating(updateRating);
            })
            .catch(error => console.log(error));
        console.log(inputs);
    }
    
    return ( 
        <div className="stop-page">
            <Navbar />
            <div className="stop-details-page-content container" id="stop-details">
                {/* <div className="row"> */}
                    <div className="row stop-info">
                        <h1>{ stop.stop_name }</h1>
                        <p>Category: { stop.stop_category }</p>
                        <p>Latitude: { stop.stop_lat}</p>
                        <p>Longitude: { stop.stop_lng }</p>
                        {
                            updateRating  ?
                            (<p>Rating: { updateRating }</p>) : null
                        }
                        <br />
                    </div>
                    <div className="row">
                        <div className="create-review col-md-6" onSubmit={handleSubmit}>
                            <h2>Leave a Review</h2>
                            <form className="create-review-form">
                                <label 
                                    htmlFor="review-rating-input" 
                                    className="create-review-form-input"
                                >
                                    Rating
                                <input 
                                    type="text" 
                                    name="rating"
                                    id="review-rating-input"
                                    value={inputs.rating || ""}
                                    onChange={handleChange}
                                    placeholder="Enter a number between 1-5"
                                    required 
                                />
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
                                    placeholder="Tell other travelers why you love it (or don't!)"
                                    required 
                                />
                                <button onClick={() => setUpdateRating(true)}>Create Review</button>
                            </form>
                        </div>
                        <div className="col-md-6">
                            <StopReviews handleRatingChange={handleRatingChange} />
                        </div>
                    </div>
                </div>
            {/* </div> */}
        </div>
     );
}
 
export default StopDetails;
