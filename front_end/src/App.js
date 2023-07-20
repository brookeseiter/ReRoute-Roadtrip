import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Components/NavBar';
import Homepage from './Pages/Homepage';
import ProfilePage from './Pages/ProfilePage';
import CreateAccountPage from './Pages/CreateAccountPage';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import CreateStopPage from './Pages/CreateStopPage';
import CreateRoutePage from './Pages/CreateRoutePage';
// import injectContext from './Storage/appContext';
import AllStopsPage from './Pages/AllStopsPage';
import StopDetails from './Pages/StopDetailsPage';
import NotFound from './Components/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} /> 
        <Route path="/create-account" element={<CreateAccountPage />} />
        <Route path="/login" element={<LoginPage />} />
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




