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
        <div className="profile-page">
            <Navbar />
            <div className="profile-page-content container">
                <div className="row">
                    <div className="col-md-12">
                        <h1>My Profile</h1>
                    </div>
                    <div className="col-md-3 create-links">
                        <Link to="/create-stop">Create a Stop</Link>
                        <br />
                        <Link to="/create-route">Create a Route</Link>
                    </div>

                    <section class="py-5 header">
                        <div class="container py-4">
                            <div class="row">
                                <div class="col-md-3">
                                    <div class="nav flex-column nav-pills nav-pills-custom" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                        <button class="nav-link mb-3 p-3 shadow active" id="v-pills-home-tab" data-toggle="pill" role="tab" aria-controls="v-pills-home" aria-selected="true">
                                            <span>Personal information</span>
                                        </button>
                                        <a class="nav-link mb-3 p-3 shadow" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">
                                            <span>Confirm booking</span>
                                        </a>
                                    </div>
                                </div>
                                <div class="col-md-9">
                                    <div class="tab-content" id="v-pills-tabContent">
                                        <div class="tab-pane fade shadow rounded bg-white show active p-5" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                                            <p class="font-italic text-muted mb-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                        </div>
                                        <div class="tab-pane fade shadow rounded bg-white p-5" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                                            <p class="font-italic text-muted mb-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section class="py-5">
                        <div class="container py-4">
                            <div class="col">
                                <Tabs
                                    defaultActiveKey="my-stops"
                                    class="nav flex-column nav-pills nav-pills-custom"
                                    aria-orientation="vertical"
                                    justify
                                >
                                    <Tab 
                                        eventKey="my-stops" 
                                        title="My Stops"
                                        class="col-md-9 nav-link shadow"  
                                    >
                                        <div 
                                            className="col-md-9 fade shadow rounded bg-white show" 
                                        >
                                            {{stopsObj} && <StopList stopsObj={stopsObj} title="My Stops" />}
                                        </div>
                                    </Tab>
                                    <Tab
                                        eventKey="my-reviews" 
                                        title="My Reviews"
                                        class="nav-link mb-3 shadow" 
                                    >
                                        <div 
                                            className="col-md-9 fade shadow rounded bg-white show p-5"                                         >
                                            <MyReviews />
                                        </div>
                                    </Tab>
                                </Tabs>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
     );
}
 
export default ProfilePage;


{/* <div className="col-md-9">
                        <Tabs
                            defaultActiveKey="my-stops"
                            id="justifyTab"
                            className="mb-3"
                            justify
                        >
                            <Tab eventKey="my-stops" title="My Stops">
                                {{stopsObj} && <StopList stopsObj={stopsObj} title="My Stops" />}
                            </Tab>
                            <Tab eventKey="my-reviews" title="My Reviews">
                                <MyReviews />
                            </Tab>
                        </Tabs>
                    </div> */}