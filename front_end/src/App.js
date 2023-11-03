import { Route, Routes, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Homepage from './Pages/Homepage';
import ProfilePage from './Pages/ProfilePage';
import CreateAccountPage from './Pages/CreateAccountPage';
import CreateStopPage from './Pages/CreateStopPage';
import CreateRoutePage from './Pages/CreateRoutePage';
import AllStopsPage from './Pages/AllStopsPage';
import StopDetailsPage from './Pages/StopDetailsPage';
import NotFound from './Components/NotFound';
import { useEffect, useState } from 'react';


function App() {
  const[isLoggedIn, setIsLoggedIn] = useState(false);
  const[user, setUser] = useState({ email: '', username: '', phoneNum: '' });
  const[currentUser, setCurrentUser] = useState({ userId: '' });
  const[loading, setLoading] = useState(false);
  const navigate = useNavigate();
 
  useEffect(() => {
    fetch(`/login-status`)
      .then((response) => response.json())
      .then((loginStatusData) => {
        if (loginStatusData.message === 'User is logged in.') {
          console.log('login-status if', isLoggedIn);
          setCurrentUser(loginStatusData.userId);
          setIsLoggedIn(true);
          // sessionStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
        } else {
          console.log('login-status else', isLoggedIn);
        }
      })
      .catch(error => {
          console.log('error: ', error);
      }, []); 
  }, [isLoggedIn]);

  // useEffect(() => {
  //   setIsLoaded(true);
  // }, [isLoaded]);

  // user activity event listeners
  document.addEventListener("mousemove", () =>{ 
    localStorage.setItem('lastActvity', new Date())
  });

  document.addEventListener("click", () =>{ 
    localStorage.setItem('lastActvity', new Date())
  });

  // automatic logout of inactive user
  // code adapted from Vishnu Bhadoriya: 
  // https://stackoverflow.com/questions/68848031/how-to-handle-inactive-users-and-log-them-out-in-react-javascript
  let timeInterval = setInterval(() => {
    let lastAcivity = localStorage.getItem('lastActvity');
    let diffMs = Math.abs(new Date(lastAcivity) - new Date()); // milliseconds between now & last activity
    let seconds = Math.floor((diffMs/1000));
    let minute = Math.floor((seconds/60));
    // console.log(seconds +' sec and '+minute+' min since last activity');
    if (user.email !== '' && minute === 15) { 
      // console.log('No activity from last 10 minutes... Logging Out');
      clearInterval(timeInterval);
      fetch(`/logout`)
            .then((response) => response.json())
            .then((data) =>{
              navigate('/'); 
              setUser({ email: '', username: '', phoneNum: '' });
              setCurrentUser({ userId: '' });
              setIsLoggedIn(false); 
            })
            .catch((error) => {
              console.log(error, 'error');
            }, [isLoggedIn]);
    }
  },1000);

  return (
    <Routes>
      <Route path="/" element={<Homepage 
                                  user={user} 
                                  setUser={setUser} 
                                  isLoggedIn={isLoggedIn} 
                                  setIsLoggedIn={setIsLoggedIn} 
                                />} /> 
      <Route path="/create-account" element={<CreateAccountPage loading={loading} />} />
      <Route path="/profile" element={<ProfilePage 
                                        user={user} 
                                        setUser={setUser} 
                                        isLoggedIn={isLoggedIn} 
                                        setIsLoggedIn={setIsLoggedIn} 
                                        currentUser={currentUser} 
                                        setCurrentUser={setCurrentUser} 
                                        loading={loading} 
                                        setLoading={setLoading} 
                                      />} />
      <Route path="/create-stop" element={<CreateStopPage 
                                            user={user} 
                                            setUser={setUser}
                                            currentUser={currentUser} 
                                            setCurrentUser={setCurrentUser}
                                            isLoggedIn={isLoggedIn} 
                                            setIsLoggedIn={setIsLoggedIn}
                                            loading={loading}
                                          />} />
      <Route path="/create-route" element={<CreateRoutePage 
                                              user={user} 
                                              setUser={setUser}
                                              currentUser={currentUser} 
                                              setCurrentUser={setCurrentUser}
                                              isLoggedIn={isLoggedIn} 
                                              setIsLoggedIn={setIsLoggedIn}
                                              loading={loading}
                                          />} />
      <Route path="/stops" element={<AllStopsPage 
                                      user={user} 
                                      setUser={setUser}
                                      currentUser={currentUser} 
                                      setCurrentUser={setCurrentUser}
                                      isLoggedIn={isLoggedIn} 
                                      setIsLoggedIn={setIsLoggedIn}
                                      loading={loading} 
                                      setLoading={setLoading} />} />
      <Route path="/stops/:stopId" element={<StopDetailsPage 
                                              user={user} 
                                              setUser={setUser} 
                                              currentUser={currentUser} 
                                              setCurrentUser={setCurrentUser}
                                              isLoggedIn={isLoggedIn} 
                                              setIsLoggedIn={setIsLoggedIn} 
                                              loading={loading}
                                              setLoading={setLoading}/>} />
      <Route path="*" element={<NotFound />} />
    </Routes> 
  );
};

export default App;





