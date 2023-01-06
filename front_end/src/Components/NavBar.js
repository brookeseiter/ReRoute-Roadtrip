import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../Storage/appContext.js';

export default function Navbar () {
    const { store, actions } = useContext(Context);

    return (  
        <nav className="navbar">
            <h1>Reroute Roadtrip</h1>
            <div className="links">
                <Link 
                    to="/" 
                    style={{color: "black"}} 
                    onClick={() => actions.logout()}
                >Log Out</Link>
                <Link to="/stops" style={{color: "black"}}>All Stops</Link>
                <Link to="/profile" style={{color: "black"}}>My Profile</Link>
            </div>
        </nav>
    );
}

