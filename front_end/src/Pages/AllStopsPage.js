import { useEffect, useState } from 'react'
import Navbar from '../Components/NavBar.js';
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
        <div className="AllStopsPage">
            <Navbar />
            <div className="AllStopsPageContent">
                {stopsObj && <StopList stopsObj={stopsObj} title="All Stops" />}
            </div>
        </div>
    );
}

export default AllStopsPage;