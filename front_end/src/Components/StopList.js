import { Link } from 'react-router-dom';


const StopList = ({ 
    filteredStops, 
    title, 
    loading, 
    setLoading 
}) => {
    const handleDeleteStop= (filteredStop) => {
        console.log(filteredStop);
        setLoading(true);
        const stopId = filteredStop.value.stop_id;
        fetch(`/stops/${stopId}`, {
            method: 'DELETE'
        }).then(() => {
            console.log("deleted"); 
            setLoading(false);
        });
    };

    return (
        <div className="stop-list">
            { title  === "All Stops" &&
                <h1>All Stops</h1>
            }
            {filteredStops && filteredStops.map((filteredStop) => (
                <div className="stop-preview rounded" key={ filteredStop.key }>
                    <Link to={`/stops/${filteredStop.value.stop_id}`}>
                        <h2>{ filteredStop.value.stop_name }</h2>
                        <p>Category { filteredStop.value.stop_category }</p>
                        <p>Latitude { filteredStop.value.stop_lat.toFixed(7) }</p>
                        <p>Longitude { filteredStop.value.stop_lng.toFixed(7) }</p>
                    </Link> 
                    { title  === "My Stops" &&
                        <button onClick={() => handleDeleteStop(filteredStop)}>Delete Stop</button>
                    }
                </div>
            ))} 
        </div>
    );
};

export default StopList;

 


// export default StopList;
// const StopList = ({ 
//     stopsObj, 
//     title, 
//     loading, 
//     setLoading 
// }) => {
//     const handleDeleteStop= (stopObj) => {
//         console.log(stopObj);
//         setLoading(true);
//         const stopId = stopObj.value.stop_id;
//         fetch(`/stops/${stopId}`, {
//             method: 'DELETE'
//         }).then(() => {
//             console.log("deleted"); 
//             setLoading(false);
//         });
//     };


//     return (
//         <div className="stop-list">
//             { title  === "All Stops" &&
//                 <h1>All Stops</h1>
//             }
//             {stopsObj.map((stopObj) => (
//                 <div className="stop-preview rounded" key={ stopObj.key }>
//                     <Link to={`/stops/${stopObj.value.stop_id}`}>
//                         <h2>{ stopObj.value.stop_name }</h2>
//                         <p>Category { stopObj.value.stop_category }</p>
//                         <p>Latitude { stopObj.value.stop_lat.toFixed(7) }</p>
//                         <p>Longitude { stopObj.value.stop_lng.toFixed(7) }</p>
//                     </Link> 
//                     { title  === "My Stops" &&
//                         <button onClick={() => handleDeleteStop(stopObj)}>Delete Stop</button>
//                     }
//                 </div>
//             ))} 
//         </div>
//     );
// };
 
// export default StopList;
