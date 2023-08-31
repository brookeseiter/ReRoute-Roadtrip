import Pagination from 'react-bootstrap/Pagination';
import { StandaloneSearchBox } from '@react-google-maps/api';
import { useEffect, useState } from 'react'
import Navbar from '../Components/NavBar.js';
import StopList from '../Components/StopList.js'

const AllStopsPage = () => {
    const [stops, setStops] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [stopsPerPage, setStopsPerPage] = useState(10);
    
    useEffect(() => {
        fetch(`/stops`)
            .then((response) => response.json())
            .then((data) => {
                setStops(data);
            })
            .catch((error) => console.log(error));
    }, []);


    const stopsObj = Object.entries(stops).map(([key, value]) => ({key, value}));
    console.log(stopsObj);

    // Get current stops
    const idxOfLastStop = currentPage * stopsPerPage;
    const idxOfFirstStop = idxOfLastStop - stopsPerPage;
    const currentStops = stopsObj.slice(idxOfFirstStop, idxOfLastStop);

    // stopsObj.filter((stop) => {
    //     // console.log(stop.value.stop_name);
    //     return stop.value.stop_name;
    // });

    const [searchInput, setSearchInput] = useState("");

    const handleChange = (e) => {
        // console.log(e.target.value);
        e.preventDefault();
        setSearchInput(e.target.value);
    };

    // if (searchInput.length > 0) {
    //     stopsObj.filter((stop) => {
    //         // console.log(stop.value.stop_name.match(searchInput));
    //         return stop.value.stop_name.match(searchInput);
    //     });
    // }

    // let active = 1;
    // let items = [];
    // for (let number = 1; number <= 5; number++) {
    //     items.push(
    //         <Pagination.Item key={number} active={number === active}>
    //         {number}
    //         </Pagination.Item>,
    //     );
    // }


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

                {stopsObj && <StopList stopsObj={currentStops} title="All Stops" />}
                {/* {stopsObj && <StopList stopsObj={stopsObj} title="All Stops" />} */}
            </div>
        </div>
    );
}

export default AllStopsPage;