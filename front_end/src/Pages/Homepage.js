import { useContext } from 'react';
import { Context } from '../Storage/appContext.js';
import LoginPage from './LoginPage.js';

export default function Homepage () {
    const { store, actions } = useContext(Context);

    return ( 
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-8 has-bg-img">
                    <img 
                        src="../Images/rocks.jpeg"
                        class="bg-img d-block" 
                        alt=""
                        width="1300px"
                        height="770px"
                    />             
                </div>
                <div className="col-md-4">
                    <br />
                    <img 
                        src="../Images/logo.png"
                        class="rounded mx-auto d-block" 
                        id="Logo"
                        alt=""
                        width="190px"
                    />  
                    <h2 className="text-center">ReRoute Roadtrip</h2>
                    <p class="text-center">Make each stop part of your adventure.</p> 
                    <LoginPage />
                </div>
            </div>
        </div>
     );
}
 
