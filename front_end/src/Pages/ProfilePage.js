import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import StopList from '../Components/StopList.js'
import MyReviews from '../Components/MyReviews.js'
import Navbar from '../Components/NavBar.js';
import { useContext } from 'react';
import { Context } from '../Storage/appContext.js';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

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
            <div className="container">
                <Navbar />
                <div className="ProfilePageContent">
                    <div className="row">
                        <div className="col-md-12">
                            <h1>My Profile</h1>
                        </div>
                        <div className="col-md-3">
                            <Link to="/create-stop">Create a Stop</Link>
                            <br />
                            <Link to="/create-route">Create a Route</Link>
                        </div>
                        <div className="col-md-9">
                            <Tabs
                                defaultActiveKey="mystops"
                                id="justify-tab-example"
                                className="mb-3"
                                justify
                            >
                                <Tab eventKey="mystops" title="My Stops">
                                    {{stopsObj} && <StopList stopsObj={stopsObj} title="My Stops" />}
                                </Tab>
                                <Tab eventKey="myreviews" title="My Reviews">
                                    <MyReviews />
                                </Tab>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default ProfilePage;


