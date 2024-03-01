import { Link } from 'react-router-dom';


const StopList = ({ 
    filteredStops, 
    title, 
    // loading, 
    // setLoading,
    setEditSuccess
}) => {
    // const handleDeleteStop= (filteredStop) => {
    //     console.log(filteredStop);
    //     setLoading(true);
    //     const stopId = filteredStop.value.stop_id;
    //     fetch(`/stops/${stopId}`, {
    //         method: 'DELETE'
    //     }).then(() => {
    //         console.log("deleted"); 
    //         setLoading(false);
    //     });
    // };
    const handleDeleteStop= (filteredStop) => {
        console.log(filteredStop);
        const stopId = filteredStop.value.stop_id;
        fetch(`/stops/${stopId}`, {
            method: 'DELETE'
        }).then(() => {
            console.log("deleted"); 
            setEditSuccess(true);
        });
    };
    console.log('in stoplist');


    return (
        <div className="stop-list">
            {filteredStops && filteredStops.map((filteredStop) => (
                <div className="stop-preview rounded" key={ filteredStop.key }>
                    <Link to={`/stops/${filteredStop.value.stop_id}`}>
                        <h2>{ filteredStop.value.stop_name }</h2>
                        <p className='stop-category'><em>{ filteredStop.value.stop_category }</em></p>
                        <p>Latitude: { filteredStop.value.stop_lat.toFixed(7) }</p>
                        <p>Longitude: { filteredStop.value.stop_lng.toFixed(7) }</p>
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

