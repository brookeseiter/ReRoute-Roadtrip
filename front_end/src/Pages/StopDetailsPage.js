import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Components/NavBar";
import StopReviews from "../Components/StopReviews";
import Spinner from 'react-bootstrap/Spinner';

// OG
// const StopDetails = ({ 
//     user, 
//     setUser, 
//     currentUser, 
//     setCurrentUser,
//     isLoggedIn, 
//     setIsLoggedIn, 
//     loading,
//     setLoading
// }) => {
//     let { stopId } = useParams(); 
//     const [stop, setStop] = useState([]); 
//     const [inputs, setInputs] = useState({});
//     const [updateRating, setUpdateRating] = useState('');
    
//     const handleRatingChange = (avgRating) => {
//         setUpdateRating(avgRating);
//     }
   
//     useEffect(() => {
//         fetch(`/stops/${stopId}`) 
//             .then((response) => response.json())
//             .then((stopData) => {
//                 console.log('stopData:', stopData);
//                 setStop(stopData);
//             }) 
//             .catch((error) => console.log(error));
//     }, [stopId]); 

//     const handleChange = (e) => {
//         const name = e.target.name;
//         const value = e.target.value;
//         setInputs(values => ({...values, [name]: value}));
//     }

//     const handleAddReview = (e) => {
//         e.preventDefault();
//         const reviewInfo = {
//             userId: currentUser,
//             stopId: stopId,
//             rating: inputs.rating,
//             content: inputs.content
//         }

//         const requestOptions = {
//             method: 'POST',
//             headers: {
//                 'content-type': 'application/json'
//             },
//             body: JSON.stringify(reviewInfo)
//         }

//         fetch(`/stops/${stopId}/review`, requestOptions)
//             .then((response) => response.json())
//             .then((data) => {
//                 console.log(data);
//                 setUpdateRating(updateRating);
//             })
//             .catch((error) => console.log(error));
//     }
    
//     return ( 
//         <div className="stop-page">
//             <Navbar 
//                 user={user}
//                 setUser={setUser} 
//                 currentUser={currentUser}
//                 setCurrentUser={setCurrentUser} 
//                 isLoggedIn={isLoggedIn}
//                 setIsLoggedIn={setIsLoggedIn} 
//             />
//             {loading ? <Spinner animation="border" /> :
//                 <div className="stop-details-page-content container" id="stop-details">
//                     {/* <div className="row"> */}
//                         <div className="row stop-info">
//                             <h1>{ stop.stop_name }</h1>
//                             <p>Category: { stop.stop_category }</p>
//                             <p>Latitude: { stop.stop_lat}</p>
//                             <p>Longitude: { stop.stop_lng }</p>
//                             {updateRating  ? (<p>Rating: {updateRating}</p>): null} 
//                             <br />
//                         </div>
//                         <div className="row">
//                             <div className="create-review col-md-6">
//                                 <h2>Leave a Review</h2>
//                                 <form className="create-review-form" onSubmit={handleAddReview}>
//                                     <label 
//                                         htmlFor="review-rating-input" 
//                                         className="create-review-form-input"
//                                     >
//                                         Rating
//                                     <input 
//                                         type="text" 
//                                         name="rating"
//                                         id="review-rating-input"
//                                         value={inputs.rating || ""}
//                                         onChange={handleChange}
//                                         placeholder="Enter a number between 1-5"
//                                         required 
//                                     />
//                                     </label>
//                                     <label 
//                                         htmlFor="review-text-input" 
//                                         className="create-review-form-input"
//                                     >
//                                         Review
//                                     </label>
//                                     <textarea 
//                                         type="textArea" 
//                                         name="content"
//                                         id="review-text-input"
//                                         value={inputs.content || ""}
//                                         onChange={handleChange} 
//                                         maxLength="500"
//                                         spellCheck="true"
//                                         placeholder="Tell other travelers why you love it (or don't!)"
//                                         required 
//                                     />
//                                     <button onClick={() => setUpdateRating(true)}>Create Review</button>
//                                 </form>
//                             </div>
//                             <div className="col-md-6">
//                                 <StopReviews handleRatingChange={handleRatingChange} />
//                             </div>
//                         </div>
//                 </div>
//             }
//         </div>
//     );
// }
 
// export default StopDetails;

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
    // const [updateRating, setUpdateRating] = useState('');
    
    // const handleRatingChange = (avgRating) => {
    //     setUpdateRating(avgRating);
    // }
    const [updateReviews, setUpdateReviews] = useState(false);

   
    useEffect(() => {
        fetch(`/stops/${stopId}`) 
            .then((response) => response.json())
            .then((stopData) => {
                console.log('stopData:', stopData);
                setStop(stopData);
            }) 
            .catch((error) => console.log(error));
        setUpdateReviews(false);
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
                    {/* <div className="row"> */}
                        <div className="row stop-info">
                            <h1>{ stop.stop_name }</h1>
                            <p>Category: { stop.stop_category }</p>
                            <p>Latitude: { stop.stop_lat}</p>
                            <p>Longitude: { stop.stop_lng }</p>
                            {stop.rating  ? (<p>Rating: {stop.rating}</p>): null} 
{/* \                           <br /> */}
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
                                        maxLength="500"
                                        spellCheck="true"
                                        placeholder="Tell other travelers why you love it (or don't!)"
                                        required 
                                    />
                                    {/* <button onClick={() => setUpdateRating(true)}>Create Review</button> */}
                                    <button onClick={() => setUpdateReviews(true)}>Create Review</button>
                                </form>
                            </div>
                            <div className="col-md-6">
                                {/* <StopReviews handleRatingChange={handleRatingChange} /> */}
                                <StopReviews setUpdateReviews={setUpdateReviews} />
                            </div>
                        </div>
                </div>
            }
        </div>
    );
}
 
export default StopDetails;

// edited
// const StopDetails = ({ 
//     user, 
//     setUser, 
//     currentUser, 
//     setCurrentUser,
//     isLoggedIn, 
//     setIsLoggedIn, 
//     loading,
//     setLoading
// }) => {
//     let { stopId } = useParams(); 
//     const [stop, setStop] = useState([]); 
//     const [inputs, setInputs] = useState({});
//     // const [reviewsObj, setReviewsObj] = useState({});
//     const [rating, setRating] = useState(null);
//     // const [updateRating, setUpdateRating] = useState('');
    
//     // const handleRatingChange = (avgRating) => {
//     //     setRating(rating);
//     // }
   
//     useEffect(() => {
//         fetch(`/stops/${stopId}`) 
//             .then((response) => response.json())
//             .then((stopData) => {
//                 console.log('stopData:', stopData);
//                 setStop(stopData);
//             }) 
//             .catch((error) => console.log(error));
//     }, [stopId, rating]); 

//     const handleChange = (e) => {
//         const name = e.target.name;
//         const value = e.target.value;
//         setInputs(values => ({...values, [name]: value}));
//     }

//     const handleAddReview = (e) => {
//         e.preventDefault();
//         const reviewInfo = {
//             userId: currentUser,
//             stopId: stopId,
//             rating: inputs.rating,
//             content: inputs.content
//         }

//         const requestOptions = {
//             method: 'POST',
//             headers: {
//                 'content-type': 'application/json'
//             },
//             body: JSON.stringify(reviewInfo)
//         }

//         fetch(`/stops/${stopId}/review`, requestOptions)
//             .then((response) => response.json())
//             .then((data) => {
//                 console.log(data);
//                 setRating(rating);
//             })
//             .catch((error) => console.log(error));

//         console.log('rating:', rating);
//     }
    
//     return ( 
//         <div className="stop-page">
//             <Navbar 
//                 user={user}
//                 setUser={setUser} 
//                 currentUser={currentUser}
//                 setCurrentUser={setCurrentUser} 
//                 isLoggedIn={isLoggedIn}
//                 setIsLoggedIn={setIsLoggedIn} 
//             />
//             {loading ? <Spinner animation="border" /> :
//                 <div className="stop-details-page-content container" id="stop-details">
//                     {/* <div className="row"> */}
//                         <div className="row stop-info">
//                             <h1>{ stop.stop_name }</h1>
//                             <p>Category: { stop.stop_category }</p>
//                             <p>Latitude: { stop.stop_lat}</p>
//                             <p>Longitude: { stop.stop_lng }</p>
//                             {rating  ? (<p>Rating: {rating}</p>): null} 
//                             <br />
//                         </div>
//                         <div className="row">
//                             <div className="create-review col-md-6">
//                                 <h2>Leave a Review</h2>
//                                 <form className="create-review-form" onSubmit={handleAddReview}>
//                                     <label 
//                                         htmlFor="review-rating-input" 
//                                         className="create-review-form-input"
//                                     >
//                                         Rating
//                                     <input 
//                                         type="text" 
//                                         name="rating"
//                                         id="review-rating-input"
//                                         value={inputs.rating || ""}
//                                         onChange={handleChange}
//                                         placeholder="Enter a number between 1-5"
//                                         required 
//                                     />
//                                     </label>
//                                     <label 
//                                         htmlFor="review-text-input" 
//                                         className="create-review-form-input"
//                                     >
//                                         Review
//                                     </label>
//                                     <textarea 
//                                         type="textArea" 
//                                         name="content"
//                                         id="review-text-input"
//                                         value={inputs.content || ""}
//                                         onChange={handleChange} 
//                                         maxLength="500"
//                                         spellCheck="true"
//                                         placeholder="Tell other travelers why you love it (or don't!)"
//                                         required 
//                                     />
//                                     <button onClick={() => setRating(true)}>Create Review</button>
//                                 </form>
//                             </div>
//                             <div className="col-md-6">
//                                 {/* <StopReviews handleRatingChange={handleRatingChange} /> */}
//                                 <StopReviews setRating={setRating} />
//                                 {/* <StopReviews setRating={setRating} reviewsObj={reviewsObj} setReviewsObj={setReviewsObj} /> */}
//                             </div>
//                         </div>
//                 </div>
//             }
//         </div>
//     );
// }
 
// export default StopDetails;
