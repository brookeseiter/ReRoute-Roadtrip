import { useEffect, useState } from 'react';
import Navbar from '../Components/NavBar.js';
import StopList from '../Components/StopList.js';
import PaginationComp from '../Components/Pagination.js';
import Spinner from 'react-bootstrap/Spinner';


const AllStopsPage = ({ 
    user, 
    setUser, 
    isLoggedIn, 
    setIsLoggedIn, 
    currentUser, 
    setCurrentUser, 
    loading, 
    setLoading 
}) => {
    const [stops, setStops] = useState({});
    // changed stops to an object 11/3, if you have any issues with stops it might be why!
    const [currentPage, setCurrentPage] = useState(1);
    const [stopsPerPage] = useState(10);
    const [query, setQuery] = useState('');
    
    useEffect(() => {
        setLoading(true);
        fetch(`/stops`)
            .then((response) => response.json())
            .then((data) => {
                setStops(data);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }, [setLoading]);

    const stopsObj = Object.entries(stops).map(([key, value]) => ({key, value}));

    const getFilteredStops = (query, stopsObj) => {
        if (!query) {
            return stopsObj;
        }
        return stopsObj.filter(stopObj => stopObj.value.stop_name.toLowerCase().includes(query.toLowerCase()));
    }

    const filteredStops = getFilteredStops(query, stopsObj);

    // Get current stops
    const idxOfLastStop = currentPage * stopsPerPage;
    const idxOfFirstStop = idxOfLastStop - stopsPerPage;
    const currentStops = filteredStops.slice(idxOfFirstStop, idxOfLastStop);


    return (
        <div className="all-stops-page">
            <Navbar 
                user={user}
                setUser={setUser} 
                currentUser={currentUser}
                setCurrentUser={setCurrentUser} 
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn} 
            />
            <div className="all-stops-page-content container">
                <h1>All Stops</h1>
                <input 
                        type="text" 
                        className="stop-search" 
                        onChange={e => setQuery(e.target.value)} 
                        placeholder='Search for a stop'
                />
                {loading ? <Spinner className="spinner" animation="border" /> :
                    <>
                    {currentStops && <StopList 
                                        filteredStops={currentStops} 
                                        loading={loading} 
                                        setLoading={setLoading} 
                                        title="All Stops" 
                                    />
                    }
                    <PaginationComp
                        itemsPerPage={stopsPerPage} 
                        totalItems={filteredStops.length}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        alwaysShown={false}
                    />
                    </>
                }
            </div>          
        </div>
    );
};

export default AllStopsPage;



