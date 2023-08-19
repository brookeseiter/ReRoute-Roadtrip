import { Route, Routes, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const[isLoggedIn, setIsLoggedIn] = useState(false);
  const[user, setUser] = useState({ email: '', username: '', phoneNum: '' });
  const[currentUser, setCurrentUser] = useState({ userId: '' });

  useEffect(() => {
    fetch('/login-status')
      .then((response) => response.json())
      .then((loginStatusData) => {
        if (loginStatusData.message === 'User is logged in.') {
          console.log('login-status if', isLoggedIn);
          setCurrentUser(loginStatusData.userId);
          navigate('/profile');
        } else {
          console.log('login-status else', isLoggedIn);
        }
      })
      .catch(error => {
          console.log('error: ', error);
      }, []); 
  }, [isLoggedIn]);


  return (
    <Routes>
      <Route path="/" element={<Homepage user={user} setUser={setUser} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} /> 
      <Route path="/create-account" element={<CreateAccountPage />} />
      <Route path="/profile" element={<ProfilePage user={user} setUser={setUser} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} currentUser={currentUser} />} />
      <Route path="/create-stop" element={<CreateStopPage user={user} isLoggedIn={isLoggedIn} currentUser={currentUser} />} />
      <Route path="/create-route" element={<CreateRoutePage />} />
      <Route path="/stops" element={<AllStopsPage />} />
      <Route path="/stops/:stopId" element={<StopDetails currentUser={currentUser} />} />
      <Route path="*" element={<NotFound />} />
    </Routes> 
  );
}

export default App;





