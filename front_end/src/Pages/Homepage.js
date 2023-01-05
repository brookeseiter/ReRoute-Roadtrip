import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../Storage/appContext.js';

export default function Homepage () {
    const { store, actions } = useContext(Context);

    return ( 
        <div className="homepage">
            <h2>Homepage</h2>  
            <div className="links">
                {!store.token ? (
                    <Link to="/login">Login</Link> 
                ) : (
                    <button onClick={() => actions.logout()}>Log Out</button>
                )}
                <br />
                <Link to="/create-account">Create Account</Link>
            </div>
            <div>{store.message}</div>

        </div>
     );
}
 
