import { Link } from 'react-router-dom';

export default function Navbar () {
    return (  
        <nav className="navbar">
            <h1>Reroute Roadtrip</h1>
            <div className="links">
                <Link to="/">Homepage</Link>
                <Link to="/stops">All Stops</Link>
                <Link to="/profile" style={{
                    color: "white",
                    backgroundColor: "#f1356d",
                    borderRadius: "8px"
                }}>My Profile</Link>
            </div>
        </nav>
    );
}

