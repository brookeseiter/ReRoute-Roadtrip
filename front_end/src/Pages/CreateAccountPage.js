import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Components/NavBar";

export default function CreateAccountPage () {
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const body = {
            fname: inputs.fname,
            lname: inputs.lname,
            email: inputs.email,
            username: inputs.username,
            password: inputs.password,
            phone_num: inputs.phone_num
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(body)
        }

        fetch('/register', requestOptions)
            // .then(response => {
            //     response.json();
            //     // if (response.status !== 200) {
            //     //     alert('Account already exists. Please choose a unique email and username.');
            //     //     navigate('/create-account');
            //     // }
            //     // else {
            //     //     alert('Account created successfully, Please log in.');
            //     //     navigate('/');
            //     // }
            // })
            .then(response => response.json())
            .then(data =>{console.log(data);})
            .catch(error => {
                console.log(error);
                // if (response.status === 409) {
                //     alert('Account already exists. Please choose a unique email and username.');
                //     navigate('/create-account');
                // }
            })
    }

    return ( 
        <div className="create-account-page" onSubmit={handleSubmit}>
            <nav className="navbar navbar-expand-lg bg-body-tertiary container">
                <div className="navbar-brand">
                    <img 
                        src='../Images/logo.png' 
                        className="d-inline-block align-text-center" 
                        id="Logo"
                        alt=''
                        width="80"
                        height="80"
                    />  
                    <h1 className="d-inline-block"> ReRoute Roadtrip</h1>
                </div>
            </nav>
            <div className="create-account-page-content container">
                <div className="row">
                    <div className="col">
                        <h1>Create An Account</h1>
                        <form className="create-account-form">
                            <div className="mb-3">
                                <label htmlFor="createAccountFormInput" className="form-label">
                                <input 
                                    type="text"
                                    className="form-control"
                                    id="createAccountFormInput"
                                    name="fname" 
                                    value={inputs.fname || ""}
                                    onChange={handleChange}
                                    placeholder="First Name"
                                />
                                </label>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="createAccountFormInput" className="form-label">
                                <input 
                                    type="text"
                                    className="form-control"
                                    id="createAccountFormInput"
                                    name="lname" 
                                    value={inputs.lname || ""}
                                    onChange={handleChange}
                                    placeholder="Last Name"
                                />
                                </label>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="createAccountFormInput" className="form-label">
                                <input 
                                    type="text"
                                    className="form-control"
                                    id="createAccountFormInput"
                                    name="email" 
                                    value={inputs.email || ""}
                                    onChange={handleChange}
                                    placeholder="Email"
                                />
                                </label>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="createAccountFormInput" className="form-label">
                                <input 
                                    type="text"
                                    className="form-control"
                                    id="createAccountFormInput"
                                    name="username" 
                                    value={inputs.username || ""}
                                    onChange={handleChange}
                                    placeholder="Username"
                                />
                                </label>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="createAccountFormInput" className="form-label">
                                <input 
                                    type="text"
                                    className="form-control"
                                    id="createAccountFormInput"
                                    name="password" 
                                    value={inputs.password || ""}
                                    onChange={handleChange}
                                    placeholder="Password"
                                />
                                </label>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="createAccountFormInput" className="form-label">
                                <input 
                                    type="text"
                                    className="form-control"
                                    id="createAccountFormInput"
                                    name="phone_num" 
                                    value={inputs.phone_num || ""}
                                    onChange={handleChange}
                                    placeholder="Phone Number"
                                />
                                </label>
                            </div>
                            <button>Submit</button>
                            <br />
                            <small>
                                Already have an account? 
                                <br /> 
                                <Link to='/'>Log In</Link>
                            </small>
                        </form>
                    </div>
                </div>
            </div>
        </div>
     );
}
