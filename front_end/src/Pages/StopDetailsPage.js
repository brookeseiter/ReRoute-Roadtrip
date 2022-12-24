import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CreateReview from "../Components/CreateReview";
import StopReviews from "../Components/StopReviews";

const StopDetails = () => {
    let { stop_id } = useParams(); 
    const [stop, setStop] = useState([]); 
    const [updateReviews, setUpdateReviews] = useState(null);

    useEffect(() => {
        fetch(`/api/stops/${stop_id}`) 
            .then(response => response.json())
            .then(data => {setStop(data)}) 
            .catch(error => console.log(error));
    }, [stop_id]); 

    console.log(stop);
    if (updateReviews !== null){
        console.log(updateReviews);
    }

    return ( 
        <div className="StopPage">
            <article>
                <h2>{ stop.stop_name }</h2>
                <p>Stop Category: { stop.stop_category }</p>
                <p>Stop Latitude: { stop.stop_lat }</p>
                <p>Stop Longitude: { stop.stop_lng }</p>
                <br></br>
                <CreateReview setUpdateReviews={setUpdateReviews}/>
                <br></br>
                <StopReviews updateReviews={updateReviews}/>
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