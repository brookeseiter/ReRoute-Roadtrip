import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Components/NavBar';
import Homepage from './Pages/Homepage';
import ProfilePage from './Pages/ProfilePage';
import CreateAccountPage from './Pages/CreateAccountPage';
// import { BrowserRouter as Router, Routes, Route, redirect, Navigate } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import CreateStopPage from './Pages/CreateStopPage';
import CreateRoutePage from './Pages/CreateRoutePage';
// import injectContext from './Storage/appContext';
import AllStopsPage from './Pages/AllStopsPage';
import StopDetails from './Pages/StopDetailsPage';
import NotFound from './Components/NotFound';
import { useEffect, useState } from 'react';

function App() {
  const[isLoggedIn, setIsLoggedIn] = useState(false);
  const[user, setUser] = useState({ email: '', username: '', password: '' });
  const[currentUser, setCurrentUser] = useState({ user_id: '' });


  
  // const changeLogStatus = () => {
  //   setIsLoggedIn(true);
  //   console.log('isLoggedIn in changeLogStatus:', isLoggedIn);
  // }
  

  useEffect(() => {
    console.log('in App.js useEffect');
    fetch('/login-status')
      .then((response) => response.json())
      .then((data) => {
        if (data.status === '200') {
          setIsLoggedIn(true);
          // setCurrentUser(data.user_id);
          console.log(data);
        }
        else {
          console.log('theres an error');
        }
      })
  }, [user]);

  console.log(isLoggedIn);

  return (
    
      <Routes>
        <Route path="/" element={<Homepage />} /> 
        <Route path="/create-account" element={<CreateAccountPage setIsLoggedIn={setIsLoggedIn} user={user}/>} />
        <Route path="/login" element={ <LoginPage user={user} setUser={setUser} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/create-stop" element={<CreateStopPage />} />
        <Route path="/create-route" element={<CreateRoutePage />} />
        <Route path="/stops" element={<AllStopsPage />} />
        <Route path="/stops/:stop_id" element={<StopDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      
  );
}

// export default injectContext(App);
export default App;




