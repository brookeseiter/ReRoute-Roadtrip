import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../Storage/appContext.js';

export default function Navbar () {
    const { store, actions } = useContext(Context);

    return (  
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <div class="navbar-brand">
                    <img 
                        src='../Images/logo.png' 
                        class="d-inline-block align-text-center" 
                        id="Logo"
                        alt=''
                        width="80"
                        height="80"
                    />  
                    <h1 class="d-inline-block"> ReRoute Roadtrip</h1>
                </div>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <Link 
                                to="/" 
                                class="nav-link" 
                                aria-current="page"
                                style={{color: "black"}} 
                                onClick={() => actions.logout()}
                            >
                                Log Out
                            </Link>
                        </li>
                        <li class="nav-item">
                            <Link 
                                to="/stops" 
                                class="nav-link"
                                style={{color: "black"}}
                            >
                                All Stops
                            </Link>
                        </li>
                        <li class="nav-item">
                            <Link 
                                to="/profile" 
                                class="nav-link"
                                style={{color: "black"}}
                            >
                                My Profile
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

