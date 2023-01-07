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
        <div className="StopPage">
            <Navbar />
            <article>
                <h2>{ stop.stop_name }</h2>
                    <p>Stop Category: { stop.stop_category }</p>
                    <p>Stop Latitude: { stop.stop_lat }</p>
                    <p>Stop Longitude: { stop.stop_lng }</p>
                <br></br>
                    {
                        updateRating  ?
                        (<p>Rating: { updateRating }</p>) : null
                    }
                <br></br>
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
                        />
                        <label>Review</label>
                        <input 
                            type="text" 
                            required 
                            name="content"
                            value={inputs.content || ""}
                            onChange={handleChange} 
                        />
                        <button onClick={() => setUpdateRating(true)}>Create Review</button>
                    </form>
            </div>
            <br></br>
                <StopReviews handleRatingChange={handleRatingChange} />
            </article>
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