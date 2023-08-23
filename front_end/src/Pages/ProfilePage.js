import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import StopList from '../Components/StopList.js'
import MyReviews from '../Components/MyReviews.js'
import Navbar from '../Components/NavBar.js';
import Tab from 'react-bootstrap/Tab';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';


const ProfilePage = ({ user, setUser, isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser }) => {
    const [myStops, setMyStops] = useState([]);
    
    console.log('value of user on ProfilePage', user);
    console.log('value of currentUser on ProfilePage', currentUser);
    
    useEffect(() => {
        fetch(`/api/${currentUser}/stops`)
            .then((response) => response.json())
            .then((userStopData) => {
                console.log(userStopData);
                setMyStops(userStopData);
            })
            .catch((error) => console.log(error));
    }, [currentUser]);

    const stopsObj = Object.entries(myStops).map(([key, value]) => ({key, value}));
    
    return ( 
        <div className="profile-page">
            <Navbar setUser={setUser} setCurrentUser={setCurrentUser} setIsLoggedIn={setIsLoggedIn} />
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

                    <section className="py-5">
                        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                            <Row>
                                <Col sm={3}>
                                    <Nav variant="pills" className="flex-column nav-pills-custom">
                                        <Nav.Item>
                                            <Nav.Link title="My Stops" className="nav-link mb-3 p-3 shadow" eventKey="first">My Stops</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link title="My Reviews" className="nav-link mb-3 p-3 shadow" eventKey="second">My Reviews</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Col>
                                <Col sm={9}>
                                    <Tab.Content>
                                        <Tab.Pane className="fade shadow rounded bg-white show p-4" eventKey="first">
                                            {{stopsObj} && <StopList stopsObj={stopsObj} title="My Stops" />}
                                        </Tab.Pane>
                                        <Tab.Pane className="fade shadow rounded bg-white show p-4" eventKey="second">
                                            <MyReviews title="My Reviews" currentUser={currentUser} />
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Col>
                            </Row>
                        </Tab.Container>
                    </section>
                </div>
            </div> 
        </div>
     );
}
 
export default ProfilePage;



// 8/16 2:51
// import { Link } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import StopList from '../Components/StopList.js'
// import MyReviews from '../Components/MyReviews.js'
// import Navbar from '../Components/NavBar.js';
// import Tab from 'react-bootstrap/Tab';
// import Col from 'react-bootstrap/Col';
// import Row from 'react-bootstrap/Row';
// import Nav from 'react-bootstrap/Nav';


// const ProfilePage = ({ isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser }) => {
//     const [myStops, setMyStops] = useState([]);
//     console.log('currentUser ProfilePage', currentUser);

    
//     useEffect(() => {
//         console.log('userId:', currentUser.userId);
//         // setCurrentUser(currentUser);

//         fetch(`/api/${currentUser.userId}/stops`)
//             .then((response) => response.json())
//             .then((userStopData) => {
//                 console.log(userStopData);
//                 setMyStops(userStopData);
//             })
//             .catch((error) => console.log(error));
//     }, [currentUser]);

//     console.log('myStops:', myStops);

//     const stopsObj = Object.entries(myStops).map(([key, value]) => ({key, value}));
    
//     if (currentUser.userId) {
//         return ( 
//             <div className="profile-page">
//                 <Navbar currentUser={currentUser} 
//                         setCurrentUser={setCurrentUser} 
//                         isLoggedIn={isLoggedIn} 
//                         setIsLoggedIn={setIsLoggedIn} 
//                 />
//                 <div className="profile-page-content container">
//                     <div className="row">
//                         <div className="col-md-12">
//                             <h1>My Profile</h1>
//                         </div>
//                         <div className="col-md-3 create-links">
//                             <Link to="/create-stop">Create a Stop</Link>
//                             <br />
//                             <Link to="/create-route">Create a Route</Link>
//                         </div>
    
//                         <section className="py-5">
//                             <Tab.Container id="left-tabs-example" defaultActiveKey="first">
//                                 <Row>
//                                     <Col sm={3}>
//                                         <Nav variant="pills" className="flex-column nav-pills-custom">
//                                             <Nav.Item>
//                                                 <Nav.Link title="My Stops" className="nav-link mb-3 p-3 shadow" eventKey="first">My Stops</Nav.Link>
//                                             </Nav.Item>
//                                             <Nav.Item>
//                                                 <Nav.Link title="My Reviews" className="nav-link mb-3 p-3 shadow" eventKey="second">My Reviews</Nav.Link>
//                                             </Nav.Item>
//                                         </Nav>
//                                     </Col>
//                                     <Col sm={9}>
//                                         <Tab.Content>
//                                             <Tab.Pane className="fade shadow rounded bg-white show p-4" eventKey="first">
//                                                 {{stopsObj} && <StopList    stopsObj={stopsObj} 
//                                                                             title="My Stops" 
//                                                                             currentUser={currentUser}              
//                                                                             setCurrentUser={setCurrentUser} 
//                                                                             isLoggedIn={isLoggedIn} 
//                                                                             setIsLoggedIn={setIsLoggedIn} />}
//                                             </Tab.Pane>
//                                             <Tab.Pane className="fade shadow rounded bg-white show p-4" eventKey="second">
//                                                 <MyReviews  title="My Reviews"   
//                                                             currentUser={currentUser}              
//                                                             setCurrentUser={setCurrentUser} 
//                                                             isLoggedIn={isLoggedIn} 
//                                                             setIsLoggedIn={setIsLoggedIn} 
//                                                 />
//                                             </Tab.Pane>
//                                         </Tab.Content>
//                                     </Col>
//                                 </Row>
//                             </Tab.Container>
//                         </section>
//                     </div>
//                 </div>
//             </div>
//         );
//     } else {
//         return (
//             <div className="profile-page">
//                 <Navbar currentUser={currentUser} 
//                         setCurrentUser={setCurrentUser} 
//                         isLoggedIn={isLoggedIn} 
//                         setIsLoggedIn={setIsLoggedIn} 
//                 />
//             </div>
//         )
//     }

// }
 
// export default ProfilePage;
