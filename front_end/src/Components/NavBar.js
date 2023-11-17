import { Link, useNavigate } from 'react-router-dom';


export default function Navbar ({ 
    user,
    setUser, 
    currentUser, 
    setCurrentUser, 
    isLoggedIn, 
    setIsLoggedIn 
}) {
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        fetch(`/logout`)
            .then((response) => response.json())
            .then((data) =>{
                setIsLoggedIn(false);
                setUser({ email: '', username: '', phoneNum: '' });
                setCurrentUser({ userId: '' });
                alert('Logout successful.');
                navigate('/');
            })
            .catch((error) => {
                console.log(error, 'error');
            });
    };

    return (  
        <nav className="navbar navbar-expand-lg bg-body-tertiary container rounded shadow">
            <div className="navbar-brand">
                <Link to="/profile" >
                    <img 
                        src='../Images/logo.png'
                        className="d-inline-block align-text-center" 
                        id="Logo"
                        alt=''
                        width="80"
                        height="80"
                    /> 
                    <h1 className="d-inline-block"> ReRoute Roadtrip</h1>
                </Link>
            </div>
            <div className="collapse navbar-collapse align-content-flex-end" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 justify-content-end">
                    <li className="nav-item">
                        <Link 
                            to="/" 
                            className="nav-link" 
                            aria-current="page"
                            style={{ color: "black" }} 
                            onClick={handleLogout}
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

