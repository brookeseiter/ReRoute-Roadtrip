import { useContext } from 'react';
import { Context } from '../Storage/appContext.js';
import LoginPage from './LoginPage.js';

export default function Homepage () {
    const { store, actions } = useContext(Context);

    return ( 
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-7">
                    <h2 class="text-center">Reroute Roadtrip</h2> 
                    <img 
                        src='../Images/logo.png' 
                        class="rounded mx-auto d-block" 
                        id="Logo"
                        alt=''
                    />  
                    <br></br>
                    <p class="text-center">Make each stop part of your adventure.</p>              
                </div>
                <div className="col-lg-5 bg-success" style={{}}>
                    <img 
                        src='../Images/logo.png' 
                        class="rounded mx-auto d-block" 
                        id="Logo"
                        alt=''
                    />  
                    <h2>ReRoute Roadtrip</h2>
                    <LoginPage />
                </div>
            </div>
            {/* <div className="links">
                {!store.token ? (
                    <Link to="/login">Login</Link> 
                ) : (
                    <button onClick={() => actions.logout()}>Log Out</button>
                )}
                <br />
                <Link to="/create-account">Create Account</Link>
            </div>
            <div>{store.message}</div> */}
        </div>
     );
}
 
