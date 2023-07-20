import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import { Context } from "../Storage/appContext";

export default function LoginPage () {
    const [inputs, setInputs] = useState({});
    // const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     actions.login(inputs).then(() => {
    //         navigate('/profile'); 
    //         console.log(inputs);
    //     })
    //     // if (actions.login(inputs) == true) {
    //     //     navigate('/profile'); 
    //     //     console.log(inputs);
    //     // }
    // }
    const handleSubmit = (e) => {
        e.preventDefault();
        const body = {
            email: inputs.email,
            password: inputs.password
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(body)
        }

        fetch('/login', requestOptions)
            console.log(requestOptions)
            .then(response => response.json())
            .then(data =>{console.log('this is the data:', data);})
            .catch(error => console.log(error))
        navigate('/profile');
    }
    

    return ( 
        <div className="login-page">
            <form className='login-form'>
                <div className="mb-3">
                    <label htmlFor="loginFormInput" className="form-label">
                    <input 
                        type="text"
                        className="form-control"
                        id="loginFormInputEmail"
                        required 
                        name="email" 
                        value={inputs.email || ""}
                        onChange={handleChange}
                        placeholder="Email"
                    />
                    </label>
                </div>
                <div className="mb-3">
                    <label htmlFor="loginFormInputPassword" className="form-label">
                    <input 
                        type="password"
                        className="form-control"
                        id="loginFormInput"
                        required 
                        name="password" 
                        value={inputs.password || ""}
                        onChange={handleChange}
                        placeholder="Password"
                    />
                    </label>
                </div>
                <button onClick={handleSubmit}>SIGN IN</button>
                <br />
                <small>
                    Don't have an account yet? 
                    <br /> 
                    <Link to='/create-account'>Create One</Link>
                </small>
            </form>
        </div>
     );
}




