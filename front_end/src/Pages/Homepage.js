import LoginPage from './LoginPage.js';

export default function Homepage () {

    return ( 
        <div className="homepage">   
            <div className="row">
                <div className="col-md-9 has-bg-img">
                    <img 
                        src="../Images/rocks.jpeg"
                        class="bg-img" 
                        alt=""
                    />             
                </div>
                <div className="col-md-3">
                    <br />
                    <img 
                        src="../Images/logo.png"
                        class="rounded mx-auto d-block" 
                        id="Logo"
                        alt=""
                        width="180px"
                    />  
                    <h2 className="text-center">ReRoute Roadtrip</h2>
                    <p class="text-center">Make each stop part of your adventure.</p> 
                    <LoginPage />
                </div>
            </div>
        </div>
     );
}
 
