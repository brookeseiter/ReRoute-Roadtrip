import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Homepage from './Pages/Homepage';
import ProfilePage from './Pages/ProfilePage';
import CreateAccountPage from './Pages/CreateAccountPage';
import LoginPage from './Pages/LoginPage';
import CreateStopPage from './Pages/CreateStopPage';
import CreateRoutePage from './Pages/CreateRoutePage';
import AllStopsPage from './Pages/AllStopsPage';
import StopDetails from './Pages/StopDetailsPage';
import NotFound from './Components/NotFound';
import { useEffect, useState } from 'react';


function App() {
  const[isLoggedIn, setIsLoggedIn] = useState(false);
  const[user, setUser] = useState({ email: '', username: '', phoneNum: '' });
  const[currentUser, setCurrentUser] = useState({ user_id: '' });


  useEffect(() => {
    fetch('/login-status')
      .then((response) => response.json())
      .then((loginStatusData) => {
        if (loginStatusData.status === '200') {
          console.log(loginStatusData);
          setIsLoggedIn(true);
          setCurrentUser(loginStatusData.user_id);
          // console.log(currentUser);
        }
        else {
          console.log(loginStatusData);
          console.log('theres an error or login hasnt happened yet');
        }
      })
  });
  

  console.log(isLoggedIn);
  console.log(currentUser);

  return (
    <Routes>
      <Route path="/" element={<Homepage user={user} setUser={setUser} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} /> 
      <Route path="/create-account" element={<CreateAccountPage />} />
      <Route path="/login" element={<LoginPage user={user} setUser={setUser} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
      <Route path="/profile" element={<ProfilePage user={user} setUser={setUser} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} currentUser={currentUser} />} />
      <Route path="/create-stop" element={<CreateStopPage user={user} isLoggedIn={isLoggedIn} />} />
      <Route path="/create-route" element={<CreateRoutePage />} />
      <Route path="/stops" element={<AllStopsPage />} />
      <Route path="/stops/:stop_id" element={<StopDetails />} />
      <Route path="*" element={<NotFound />} />
    </Routes> 
  );
}

export default App;




