import { Route, Routes, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Homepage from './Pages/Homepage';
import ProfilePage from './Pages/ProfilePage';
import CreateAccountPage from './Pages/CreateAccountPage';
// import LoginPage from './Pages/LoginPage';
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
          setIsLoggedIn(true);
          setCurrentUser(loginStatusData.userId);
          navigate('/profile');
        } else {
          console.log('login-status else', isLoggedIn);
          // setIsLoggedIn(false);
        }
      })
      .catch(error => {
          console.log('error: ', error);
      }, []); 
  }, [isLoggedIn, currentUser]);


  return (
    <Routes>
      <Route path="/" element={<Homepage user={user} setUser={setUser} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} /> 
      <Route path="/create-account" element={<CreateAccountPage />} />
      <Route path="/profile" element={<ProfilePage user={user} setUser={setUser} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} currentUser={currentUser} />} />
      <Route path="/create-stop" element={<CreateStopPage user={user} isLoggedIn={isLoggedIn} currentUser={currentUser} />} />
      <Route path="/create-route" element={<CreateRoutePage />} />
      <Route path="/stops" element={<AllStopsPage />} />
      <Route path="/stops/:stop_id" element={<StopDetails currentUser={currentUser} />} />
      <Route path="*" element={<NotFound />} />
    </Routes> 
  );
}

export default App;

// 8/16 2:51
// import { Route, Routes } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Homepage from './Pages/Homepage';
// import ProfilePage from './Pages/ProfilePage';
// import CreateAccountPage from './Pages/CreateAccountPage';
// import CreateStopPage from './Pages/CreateStopPage';
// import CreateRoutePage from './Pages/CreateRoutePage';
// import AllStopsPage from './Pages/AllStopsPage';
// import StopDetails from './Pages/StopDetailsPage';
// import NotFound from './Components/NotFound';
// import { useEffect, useState } from 'react';


// function App() {
//   const[isLoggedIn, setIsLoggedIn] = useState(false);
//   // const[currentUser, setCurrentUser] = useState({ userId: '', email: '', username: '', phoneNum: '' });
//   const[currentUser, setCurrentUser] = useState({});

//   useEffect(() => {
//     fetch(`/login-status`)
//       .then((response) => response.json())
//       .then((loginStatusData) => {
//         if ( loginStatusData.userId) {
//           setCurrentUser({...currentUser, userId: loginStatusData.userId, email: loginStatusData.email, username: loginStatusData.username, phoneNum: loginStatusData.phoneNum });
//           console.log('in app else');
//         }
//         else {
//           setIsLoggedIn(false);
//           setCurrentUser({...currentUser, userId: '', email: '', username: '', phoneNum: '' });
//           console.log('in app if');
//         }
//         // if (loginStatusData.message === 'There is no user currently in the session.') {
//         //   setIsLoggedIn(false);
//         //   setCurrentUser({...currentUser, userId: '', email: '', username: '', phoneNum: '' });
//         //   console.log('in app if');
//         // }
//         // else {
//         //   setCurrentUser({...currentUser, userId: loginStatusData.userId, email: loginStatusData.email, username: loginStatusData.username, phoneNum: loginStatusData.phoneNum });
//         //   console.log('in app else');
//         // }
//       })
//       .catch(error => {
//           console.log('error: ', error);
//       }, []); 
//   // eslint-disable-next-line
//   }, [isLoggedIn]);

//   return (
//     <Routes>
//       <Route path="/" element={<Homepage  currentUser={currentUser} 
//                                           setCurrentUser={setCurrentUser} 
//                                           isLoggedIn={isLoggedIn} 
//                                           setIsLoggedIn={setIsLoggedIn} />} /> 
//       <Route path="/create-account" element={<CreateAccountPage />} />
//       <Route path="/profile" element={<ProfilePage  currentUser={currentUser} 
//                                                     setCurrentUser={setCurrentUser} 
//                                                     isLoggedIn={isLoggedIn} 
//                                                     setIsLoggedIn={setIsLoggedIn} />} />
//       <Route path="/create-stop" element={<CreateStopPage currentUser={currentUser} 
//                                                           isLoggedIn={isLoggedIn} />} />
//       <Route path="/create-route" element={<CreateRoutePage />} />
//       <Route path="/stops" element={<AllStopsPage />} />
//       <Route path="/stops/:stop_id" element={<StopDetails currentUser={currentUser} />} />
//       <Route path="*" element={<NotFound />} />
//     </Routes> 
//   );
// }

// export default App;




