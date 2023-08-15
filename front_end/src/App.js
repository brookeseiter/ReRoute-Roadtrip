import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Homepage from './Pages/Homepage';
import ProfilePage from './Pages/ProfilePage';
import CreateAccountPage from './Pages/CreateAccountPage';
import CreateStopPage from './Pages/CreateStopPage';
import CreateRoutePage from './Pages/CreateRoutePage';
import AllStopsPage from './Pages/AllStopsPage';
import StopDetails from './Pages/StopDetailsPage';
import NotFound from './Components/NotFound';
import { useEffect, useState } from 'react';


function App() {
  const[isLoggedIn, setIsLoggedIn] = useState(false);
  const[currentUser, setCurrentUser] = useState({ userId: '', email: '', username: '', phoneNum: '' });

  useEffect(() => {
    fetch(`/login-status`)
      .then((response) => response.json())
      .then((loginStatusData) => {
        if (loginStatusData.message === 'There is no user currently in the session.') {
          setIsLoggedIn(false);
          setCurrentUser({...currentUser, userId: '', email: '', username: '', phoneNum: '' });
        }
        else {
          setCurrentUser({...currentUser, userId: loginStatusData.userId, email: loginStatusData.email, username: loginStatusData.username, phoneNum: loginStatusData.phoneNum });
        }
      })
      .catch(error => {
          console.log('error: ', error);
      }, []); 
  // eslint-disable-next-line
  }, [isLoggedIn]);

  return (
    <Routes>
      <Route path="/" element={<Homepage currentUser={currentUser} setCurrentUser={setCurrentUser} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} /> 
      <Route path="/create-account" element={<CreateAccountPage />} />
      <Route path="/profile" element={<ProfilePage currentUser={currentUser} setCurrentUser={setCurrentUser} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
      <Route path="/create-stop" element={<CreateStopPage currentUser={currentUser} isLoggedIn={isLoggedIn} />} />
      <Route path="/create-route" element={<CreateRoutePage />} />
      <Route path="/stops" element={<AllStopsPage />} />
      <Route path="/stops/:stop_id" element={<StopDetails currentUser={currentUser} />} />
      <Route path="*" element={<NotFound />} />
    </Routes> 
  );
}

export default App;




