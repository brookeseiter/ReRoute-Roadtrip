import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import StopList from '../Components/StopList.js'
import MyReviews from '../Components/MyReviews.js'
import Navbar from '../Components/NavBar.js';

const ProfilePage = () => {
    const [myStops, setMyStops] = useState([]);
    
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
            <h2>My Profile</h2>
            <Link to="/create-stop">Create a Stop</Link>
            <Link to="/create-route">Create a Route</Link>
            <br></br>
            {stopsObj && <StopList stopsObj={stopsObj} title="My Stops" />}
            <MyReviews />
        </div>
     );
}
 
export default ProfilePage;


