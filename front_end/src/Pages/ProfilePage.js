import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import StopList from '../Components/StopList.js'
import MyReviews from '../Components/MyReviews.js'
import Navbar from '../Components/NavBar.js';
import { useContext } from 'react';
import { Context } from '../Storage/appContext.js';

const ProfilePage = () => {
    const [myStops, setMyStops] = useState([]);
    const { store, actions } = useContext(Context);
    
    useEffect(() => {
        const user_id = sessionStorage.user_id

        fetch(`/api/${user_id}/stops`)
            .then(response => response.json())
            .then(data => {setMyStops(data)})
            .catch(error => console.log(error));
    }, []);

    const stopsObj = Object.entries(myStops).map(([key, value]) => ({key, value}))

    return ( 
        <div className="ProfilePage">
            <Navbar />
            <h2>My Profile</h2>
            <Link to="/create-stop">Create a Stop</Link>
            <br />
            <Link to="/create-route">Create a Route</Link>
            <br />
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">My Reviews</a>
                    {/* {stopsObj && <StopList stopsObj={stopsObj} title="My Stops" />} */}
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">My Stops</a>
                </li>
            </ul>
            {/* {stopsObj && <StopList stopsObj={stopsObj} title="My Stops" />} */}
            <MyReviews />
        </div>
     );
}
 
export default ProfilePage;


