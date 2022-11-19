import { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {

    const [inputs, setInputs] = useState({});

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}))
        console.log('handleChange triggered')
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // const body = {
        //     email: inputs.email,
        //     password: inputs.password
        // }

        // const requestOptions = {
        //     method: 'POST',
        //     headers: {
        //         'content-type': 'application/json'
        //     },
        //     body: JSON.stringify(body)
        // }

        // fetch('/register', requestOptions)
        //     .then(response => response.json())
        //     .then(data =>{console.log(data)})
        //     .catch(err => console.log(err))

        
        console.log('handleSubmit triggered');
        console.log(inputs);

    }
    
    const loginUser = () => {

    }

    return ( 
        <div className="LoginPage">
            <h2>Login</h2>
            <form className="LoginForm" onSubmit={handleSubmit(loginUser)}>
                <label>Email:</label>
                <input 
                    type="text" 
                    required 
                    name="email" 
                    value={inputs.email || ""}
                    onChange={handleChange}
                />
                <label>Password:</label>
                <input 
                    type="text" 
                    required 
                    name="password" 
                    value={inputs.password || ""}
                    onChange={handleChange}
                />
                <button>Sign In</button>
                <br></br>
                <small>Don't have an account? <Link to='/create-account'>Create an Account</Link></small>
            </form>
        </div>
     );
}
 
export default LoginPage;