import LoginPage from './LoginPage.js';

export default function Homepage ({ user, setUser, isLoggedIn, setIsLoggedIn }) {

    return ( 
        <div className="homepage">   
            <img 
                src="../Images/rocks.jpeg"
                className="bg-img" 
                alt=""
            />             
            <div className="col-md-3">
                <br />
                <img 
                    src="../Images/logo.png"
                    className="rounded mx-auto d-block sm-img" 
                    id="Logo"
                    alt=""
                />  
                <h2 className="text-center">ReRoute Roadtrip</h2>
                <p className="text-center">Make each stop part of your adventure.</p> 
                <LoginPage 
                    user={user} 
                    setUser= {setUser} 
                    isLoggedIn={isLoggedIn} 
                    setIsLoggedIn={setIsLoggedIn} 
                />
            </div>
        </div>
    );
}
