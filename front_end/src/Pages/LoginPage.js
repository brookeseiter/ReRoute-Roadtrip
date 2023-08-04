import React from 'react';
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, redirect } from "react-router-dom";
// import { useHistory } from 'react-router-dom';
// import { useContext } from "react";
// import { Context } from "../Storage/appContext";


export default function LoginPage ({ user, setUser, setIsLoggedIn }) {
    const navigate = useNavigate();
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");

    const updateEmail = (evt) => {
        evt.preventDefault();
        setEmail(evt.target.value);
    };

    const updatePassword = (evt) => {
        evt.preventDefault();
        setPassword(evt.target.value);
    };

    const handleLogin = (evt) => {
        console.log('in handleLogin');
        evt.preventDefault();
        console.log(user);
    
        if (email === "" || password === "") {
          alert("Please enter both email and password.");
        } else {
          fetch(`/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
          })
            .then((response) => response.json())
            .then((userData) => {
              if (userData.status === '200') {
                setIsLoggedIn(true);
                // setTimeout(() => {
                //   navigate('/profile')
                // }, 2500)
                navigate('/profile');
              }
              else {
                Error('error message:', 'there has been an error');
              }
            }, []);
    }};
  

    return ( 
        <div className="login-page">
            <form className='login-form' onSubmit={handleLogin}>
                <div className="mb-3">
                    <label htmlFor="loginFormInputEmail" className="form-label">
                    <input 
                        value={email}
                        type="text"
                        className="form-control"
                        id="loginFormInputEmail"
                        required 
                        name="email" 
                        onChange={updateEmail}
                        placeholder="Email"
                    />
                    </label>
                </div>
                <div className="mb-3">
                    <label htmlFor="loginFormInputPassword" className="form-label">
                    <input 
                        value={password}
                        type="password"
                        className="form-control"
                        id="loginFormInputPassword"
                        required 
                        name="password" 
                        onChange={updatePassword}
                        placeholder="Password"
                    />
                    </label>
                </div>
                <button type="submit">SIGN IN</button>
                <br />
                <small>
                    Don't have an account yet? 
                    <br /> 
                    <Link to='/create-account'>Create One</Link>
                </small>
            </form>
        </div>
  );


// export default function LoginPage ({handleLogin, updateEmail, updatePassword, isLoggedIn}) {
//     const [inputs, setInputs] = useState({});
//     // const { store, actions } = useContext(Context);
//     // const[user, setUser] = useState({});
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         const name = e.target.name;
//         const value = e.target.value;
//         setInputs(values => ({...values, [name]: value}));
//     }

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const body = {
//             email: inputs.email,
//             password: inputs.password
//         }

//         const requestOptions = {
//             credentials: 'same-origin',
//             method: 'POST',
//             headers: {
//                 'content-type': 'application/json'
//             },
//             body: JSON.stringify(body)
//         }

//         // fetch('/login', requestOptions)
//         //     .then(response => {
//         //         response.json();
//         //         console.log(response);
//         //         if (response.status === 200) {
//         //             alert('Login successful.');
//         //             navigate('/profile');
//         //         }
//         //     })
//         //     .then(data => console.log('this is the data:', data))
//         //     .catch(error => {
//         //         console.log(error, 'error');
//         //         if (error.response.status === 401) {
//         //             alert('Incorrect email or password');
//         //         }
//         //     });
//         fetch('/login', requestOptions)
//             .then(response => response.ok ? response.json() : Promise.reject(response))
//             .then(userData => {
//                 console.log('userData:', userData);
//                 setUser(userData);
//                 alert('Login successful.');
//                 navigate('/profile');
//             })
//             .catch(error => {
//                 console.log('error: ', error);
//                 if (error.status === 401) {
//                     alert('Incorrect email or password');
//                 }
//             });
//     }
    

//     return ( 
//         <div className="login-page">
//             <form className='login-form'>
//                 <div className="mb-3">
//                     <label htmlFor="loginFormInput" className="form-label">
//                     <input 
//                         type="text"
//                         className="form-control"
//                         id="loginFormInputEmail"
//                         required 
//                         name="email" 
//                         value={inputs.email || ""}
//                         onChange={handleChange}
//                         placeholder="Email"
//                     />
//                     </label>
//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="loginFormInputPassword" className="form-label">
//                     <input 
//                         type="password"
//                         className="form-control"
//                         id="loginFormInput"
//                         required 
//                         name="password" 
//                         value={inputs.password || ""}
//                         onChange={handleChange}
//                         placeholder="Password"
//                     />
//                     </label>
//                 </div>
//                 <button onClick={handleSubmit}>SIGN IN</button>
//                 <br />
//                 <small>
//                     Don't have an account yet? 
//                     <br /> 
//                     <Link to='/create-account'>Create One</Link>
//                 </small>
//             </form>
//         </div>
//      );
}




