import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../Storage/appContext.js';

export default function Navbar () {
    const { store, actions } = useContext(Context);

    return (  
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <h2 class="navbar-brand">
                    <img 
                        src='../Images/logo.png' 
                        class="d-inline-block align-text-top" 
                        // class="rounded mx-auto d-block" 
                        id="Logo"
                        alt=''
                        width="90"
                        height="90"
                    />  
                    <h2 class="d-inline-block align-text-top" >ReRoute Roadtrip</h2>
                </h2>
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

