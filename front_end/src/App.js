import Navbar from './NavBar';
import Homepage from './Homepage';
import ProfilePage from './ProfilePage';
import CreateAccountPage from './CreateAccountPage';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import LoginPage from './LoginPage';
import CreateStopPage from './CreateStop';


function App() {
  const [message, setMessage] = useState("")

  useEffect (() => {
    fetch("/users")
      .then(response => response.json())
      .then(data => {setMessage(data.hello)})
  }, [])

  return (
    <Router>
      <div className="App">
        <p>{ message }</p>
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Homepage />} /> 
            <Route path="create-account" element={<CreateAccountPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="create-stop" element={<CreateStopPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;


