import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../Storage/appContext";

export default function LoginPage () {
    const [inputs, setInputs] = useState({});
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        actions.login(inputs).then(() => {
            navigate('/profile'); 
        })
    }

    return ( 
        <div className="LoginPage">
            <form className='LoginForm'>
                <h2>Login</h2>
                <div className="mb-3">
                    <label htmlFor="loginFormInput" className="form-label">Email
                    <input 
                        type="text"
                        className="form-control"
                        id="loginFormInput"
                        required 
                        name="email" 
                        value={inputs.email || ""}
                        onChange={handleChange}
                        placeholder="Enter email"
                    />
                    </label>
                </div>
                <div className="mb-3">
                    <label htmlFor="loginFormInput" className="form-label">Password
                    <input 
                        type="text"
                        className="form-control"
                        id="loginFormInput"
                        required 
                        name="password" 
                        value={inputs.password || ""}
                        onChange={handleChange}
                        placeholder="Enter password"
                    />
                    </label>
                </div>
                <button onClick={handleSubmit}>Sign In</button>
                <br></br>
                <small>Don't have an account yet? <Link to='/create-account'>Create One!</Link></small>
            </form>
        </div>
     );
}




