import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import CreateReview from "../Components/CreateReview";
// import StopReviews from "../Components/StopReviews";

const StopDetails = () => {
    let { stop_id } = useParams(); 
    const [stop, setStop] = useState([]); 
    // const [query, setQuery] = useState("");
    const [inputs, setInputs] = useState({});
    const [reviews, setReviews] = useState([]); 

    useEffect(() => {
        fetch(`/api/stops/${stop_id}`) 
            .then(response => response.json())
            .then(data => {setStop(data)}) 
            .catch(error => console.log(error));
    }, [stop_id]); 

    console.log(stop);

    // const handleInput = (e) => {
    //     onQuery(e.target.value);
    // }

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
            .then(data =>console.log(data))
            .catch(error => console.log(error))

        
        console.log('handleSubmit triggered');
        console.log(inputs);
        console.log(body);
    }

    useEffect(() => {
        fetch(`/api/stops/${stop_id}/reviews`) 
            .then(response => response.json())
            .then(data => {setReviews(data)}) 
            .catch(error => console.log(error));
    }, [stop_id]); 

    const reviewsObj = Object.entries(reviews).map(([key, value]) => ({key, value}))

    return ( 
        <div className="StopPage">
            <article>
                <h2>{ stop.stop_name }</h2>
                <p>Stop Category: { stop.stop_category }</p>
                <p>Stop Latitude: { stop.stop_lat }</p>
                <p>Stop Longitude: { stop.stop_lng }</p>
                {/* <br></br>
                <CreateReview onQuery={setQuery}/>
                <br></br>
                <StopReviews query={query}/> */}
            </article>
            <div className="CreateReview" onSubmit={handleSubmit}>
                <h2>Leave a Review</h2>
                    <form className="CreateReviewForm">
                        <label>Rating</label>
                        <input 
                            type="text" 
                            required 
                            name="rating"
                            value={inputs.rating || ""}
                            onChange={handleChange}
                            // onInput={handleInput}
                        />
                        <label>Review</label>
                        <input 
                            type="text" 
                            required 
                            name="content"
                            value={inputs.content || ""}
                            onChange={handleChange} 
                            // onInput={handleInput}
                        />
                        <button>Create Review</button>
                    </form>
            </div>
            <div className="StopReviewDetails">
            <article>
            <h2>Reviews</h2>
                {(reviewsObj.length === 0) && "Be the first to leave a review!" }
                {reviewsObj.map((reviewObj) => (
                    <div className="review-preview" key={ reviewObj.key }>
                            <p>Rating: { reviewObj.value.rating }</p>
                            <p>{ reviewObj.value.content }</p>
                            <br></br>
                    </div>
                ))}
            </article>
        </div>
        </div>
     );
}
 
export default StopDetails;





// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

// const StopDetails = () => {
//     let { stop_id } = useParams(); 
//     const [stop, setStop] = useState([]); 

//     useEffect(() => {
//         fetch(`/api/stops/${stop_id}`) 
//             .then(response => response.json())
//             .then(data => {setStop(data)}) 
//             .catch(error => console.log(error));
//     }, [stop_id]); 
    
//     const stopDetailsObj = Object.entries(stop).map(([key, value],) => ({key, value}))
//     console.log(stopDetailsObj)


//     return ( 
//         <div className="StopPage">
//             <article>
//                 {/* <h2>{stopDetailsObj.value.stop_name }</h2>
//                 <p>Category { stopDetailsObj.value.stop_category }</p>
//                 <p>Latitude { stopDetailsObj.value.stop_lat }</p>
//                 <p>Longitude { stopDetailsObj.value.stop_lng }</p> */}
//                 {stopDetailsObj.map((stopDetailsObj) => (
//                  <div className="stop-preview" key={ stopDetailsObj.key }>
//                         <h2>{ stopDetailsObj.value.stop_name }</h2>
//                         <p>Category { stopDetailsObj.value.stop_category }</p>
//                         <p>Latitude { stopDetailsObj.value.stop_lat }</p>
//                         <p>Longitude { stopDetailsObj.value.stop_lng }</p>
//                         <p>Rating {stopDetailsObj.value.rating}</p>
//                 </div>
                
//             ))}
//             </article>
//         </div>
//      );
// }
 
// export default StopDetails;