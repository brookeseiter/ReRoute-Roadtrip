import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Components/NavBar";
import StopReviews from "../Components/StopReviews";

const StopDetails = () => {
    let { stop_id } = useParams(); 
    const [stop, setStop] = useState([]); 
    const [updateRating, setUpdateRating] = useState('');

    const handleRatingChange = avgRating => {
        console.log(avgRating);
        setUpdateRating(avgRating);
    }

    useEffect(() => {
        fetch(`/api/stops/${stop_id}`) 
            .then(response => response.json())
            .then(data => {setStop(data)}) 
            .catch(error => console.log(error));
    }, [stop_id]); 

    const [inputs, setInputs] = useState({});

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const body = {
            user_id: sessionStorage.user_id,
            stop_id: stop_id,
            rating: inputs.rating,
            content: inputs.content
        }
        console.log(sessionStorage);

        const requestOptions = {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(body)
        }

        fetch(`/api/stops/${stop_id}/review`, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setUpdateRating(updateRating);
            })
            .catch(error => console.log(error));
        console.log('handleSubmit triggered');
        console.log(inputs);
        console.log(body);
    }
    
    return ( 
        <div className="stop-page">
            <Navbar />
            <div className="stop-details-page-content container">
                {/* <div className="row"> */}
                    <div className="row stop-info">
                        <h1>{ stop.stop_name }</h1>
                        <p>Category: { stop.stop_category }</p>
                        <p>Latitude: { stop.stop_lat }</p>
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
                                htmlFor="createReviewFormControlInput" 
                                class="form-label"
                            >
                                Rating
                            <input 
                                type="text" 
                                className="form-control"
                                id="createReviewFormControlInput"
                                required 
                                name="rating"
                                value={inputs.rating || ""}
                                onChange={handleChange}
                            />
                            </label>
                            <label 
                                htmlFor="createReviewFormControlTextArea" 
                                class="form-label"
                            >
                                Review
                            </label>
                            <textarea 
                                type="textarea" 
                                className="form-control"
                                id="createReviewFormControlTextArea"
                                required 
                                name="content"
                                value={inputs.content || ""}
                                onChange={handleChange} 
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
