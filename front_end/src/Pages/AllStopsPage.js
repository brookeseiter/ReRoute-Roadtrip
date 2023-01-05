import { useEffect, useState } from 'react'
import StopList from '../Components/StopList.js'

const AllStopsPage = () => {

    const [stops, setStops] = useState([]);
    
    useEffect(() => {
        fetch('/api/stops')
            .then(response => response.json())
            .then(data => {setStops(data)})
            .catch(error => console.log(error));
    }, []);
    console.log(stops);

    const stopsObj = Object.entries(stops).map(([key, value]) => ({key, value}))
    console.log(stopsObj)


    return (
        <div className="stop-list">
            {stopsObj && <StopList stopsObj={stopsObj} title="All Stops" />}
        </div>
    );
}

export default AllStopsPage;