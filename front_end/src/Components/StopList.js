import { Link } from 'react-router-dom';

const StopList = ({ stopsObj, title, isLoaded, setIsLoaded }) => {

    const handleDeleteStop= (stopObj) => {
        console.log(stopObj);
        const stopId = stopObj.value.stop_id;
        fetch(`/stops/${stopId}`, {
            method: 'DELETE'
        }).then(() => {
            console.log("deleted"); 
            // setIsLoaded(true);
        });
        window.location.reload(true);
    };

    return (
        <div className="stop-list">
            { title  === "All Stops" &&
                <h1>All Stops</h1>
            }
            {stopsObj.map((stopObj) => (
                 <div className="stop-preview rounded" key={ stopObj.key }>
                    <Link to={`/stops/${stopObj.value.stop_id}`}>
                        <h2>{ stopObj.value.stop_name }</h2>
                        <p>Category { stopObj.value.stop_category }</p>
                        <p>Latitude { stopObj.value.stop_lat.toFixed(7) }</p>
                        <p>Longitude { stopObj.value.stop_lng.toFixed(7) }</p>
                    </Link> 
                    { title  === "My Stops" &&
                        <button onClick={() => handleDeleteStop(stopObj)}>Delete Stop</button>
                    }
                </div>
            ))}
        </div>
    );
}
 
export default StopList;
