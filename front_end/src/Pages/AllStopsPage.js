import { StandaloneSearchBox } from '@react-google-maps/api';
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
    // console.log(stops);

    const stopsObj = Object.entries(stops).map(([key, value]) => ({key, value}));
    // console.log(stopsObj);

    stopsObj.filter((stop) => {
        console.log(stop.value.stop_name);
        return stop.value.stop_name;
    });

    const [searchInput, setSearchInput] = useState("");

    const handleChange = (e) => {
        // console.log(e.target.value);
        e.preventDefault();
        setSearchInput(e.target.value);
    };

    if (searchInput.length > 0) {
        stopsObj.filter((stop) => {
            // console.log(stop.value.stop_name.match(searchInput));
            return stop.value.stop_name.match(searchInput);
        });
    }


    return (
        <div className="all-stops-page">
            <Navbar />
            <div className="all-stops-page-content container">
                {/* <input 
                    type="search"
                    onChange={handleChange}
                    value={searchInput} />
                <table>
                    <tr>
                        <th>Country</th>
                    </tr>

                    {stopsObj.map((stop) => {

                    <div key={stop.key}>
                        <tr>
                            <td>{stop.value.stop_name}</td>
                        </tr>
                    </div>

                    })}
                </table> */}


                {stopsObj && <StopList stopsObj={stopsObj} title="All Stops" />}
            </div>
        </div>
    );
}

export default AllStopsPage;