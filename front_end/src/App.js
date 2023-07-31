import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Components/NavBar';
import Homepage from './Pages/Homepage';
import ProfilePage from './Pages/ProfilePage';
import CreateAccountPage from './Pages/CreateAccountPage';
import { BrowserRouter as Router, Routes, Route, redirect, Navigate } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import CreateStopPage from './Pages/CreateStopPage';
import CreateRoutePage from './Pages/CreateRoutePage';
// import injectContext from './Storage/appContext';
import AllStopsPage from './Pages/AllStopsPage';
import StopDetails from './Pages/StopDetailsPage';
import NotFound from './Components/NotFound';
import { useEffect, useState } from 'react';

function App() {
  const[user, setUser] = useState({});
  const[isLoggedIn, setIsLoggedIn] = useState(null);
  const[loading, setLoading] = useState(false);
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(`/user`)
      .then((response) => response.json())
      .then((userData) => {
        if (!(userData.user_id)) {
          setUser({});
          setIsLoggedIn(false);
          console.log('in /user if, not logged in');
        }
        else {
          setUser(userData);
          setIsLoggedIn(true);
          console.log('in /user else, logged in');

        }
      setLoading(false);
      })
  }, [])

  // useEffect(() => {
  //   if (!(isLoggedIn)) {
  //     redirect(`/`);
  //     console.log('in useEffect isLoggedIn, not logged in');
  //   }
  // }, [isLoggedIn])


  const confirmLogin = (user) => {
    if (user === "Incorrect Email") {
      alert("Email and password is incorrect.");
      console.log('in if confirmLogin');
    } else if (user === "Incorrect Password") {
      alert("Password is incorrect.");
      console.log('in else if confirmLogin, incorrect pw');
    } else {
      setIsLoggedIn(true);
      console.log('in else confirmLogin, login confirmed');
    }
  }

  const updateEmail = evt => {
    setEmail(evt.target.value);
    console.log('in update email');

  };

  const updatePassword = evt => {
    setPassword(evt.target.value);
    console.log('in update password');
  };

  const handleLogin = evt => {
    console.log('in handleLogin');
    evt.preventDefault();
    const userJson = { 'email': email, 'password': password };
    console.log(userJson);

    if (email === "" || password === "") {
      alert("Please enter both email and password.");
    } else {
      fetch(`/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userJson)
      })
        .then((response) => response.json())
        .then((userData) => {
          if (userData==="Incorrect Password" || userData==="Incorrect Email") {
            alert(userData);
            console.log('in if handleLogin');
          } else {
            setUser(userData);
            confirmLogin(user);
            redirect(`/profile`);
            console.log('in else handleLogin');
          }
        })
  }};

  const handleSignOut = evt => {
    fetch('/logout')
      .then((response) => response.text())
      .then((updateLogin) => {
        setUser({});
        // setIsLoggedIn(false);
    });
  };


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} /> 
        <Route path="/create-account" element={<CreateAccountPage />} />
        <Route path="/login" element={ <LoginPage handleLogin={evt => handleLogin(evt)}
                                                  updateEmail={evt => updateEmail(evt)}
                                                  updatePassword={evt => updatePassword(evt)}
                                                  email={email}
                                                  password={password}
                                                  isLoggedIn={isLoggedIn} 
                                                  loading={loading}/> } />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/create-stop" element={<CreateStopPage />} />
        <Route path="/create-route" element={<CreateRoutePage />} />
        <Route path="/stops" element={<AllStopsPage />} />
        <Route path="/stops/:stop_id" element={<StopDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

// export default injectContext(App);
export default App;




