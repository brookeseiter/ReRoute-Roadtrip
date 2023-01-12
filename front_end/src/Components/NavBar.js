import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../Storage/appContext.js';

export default function Navbar () {
    const { store, actions } = useContext(Context);

    return (  
        <nav className="navbar navbar-expand-lg bg-body-tertiary container rounded shadow">
            <div className="navbar-brand">
                <img 
                    src='../Images/logo.png' 
                    className="d-inline-block align-text-center" 
                    id="Logo"
                    alt=''
                    width="80"
                    height="80"
                />  
                <h1 className="d-inline-block"> ReRoute Roadtrip</h1>
            </div>
            <div className="collapse navbar-collapse align-content-flex-end" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 justify-content-end">
                    <li className="nav-item">
                        <Link 
                            to="/" 
                            className="nav-link" 
                            aria-current="page"
                            style={{color: "black"}} 
                            onClick={() => actions.logout()}
                        >
                            Log Out
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link 
                            to="/stops" 
                            className="nav-link"
                            style={{color: "black"}}
                        >
                            All Stops
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link 
                            to="/profile" 
                            className="nav-link"
                            style={{color: "black"}}
                        >
                            My Profile
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

