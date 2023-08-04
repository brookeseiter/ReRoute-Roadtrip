import React from 'react';
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function LoginPage ({ user, setUser, setIsLoggedIn }) {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        console.log('in handleLogin');
        e.preventDefault();
        console.log(user);
        fetch(`/login`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(user)
        })
          .then((response) => response.json())
          .then((userData) => {
            console.log(userData);
            if (userData.user_id) {
              console.log('userData:', userData)
              setIsLoggedIn(true);
              navigate('/profile');
            }
            else {
              console.log('didnt go through');
            }
          }, []);
    };
  

    return ( 
        <div className="login-page">
            <form className='login-form' onSubmit={handleLogin}>
                <div className="mb-3">
                    <label htmlFor="loginFormInputEmail" className="form-label">
                    <input 
                        value={user.email}
                        type="text"
                        className="form-control"
                        id="loginFormInputEmail"
                        required 
                        name="email" 
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        placeholder="Email"
                    />
                    </label>
                </div>
                <div className="mb-3">
                    <label htmlFor="loginFormInputPassword" className="form-label">
                    <input 
                        value={user.password}
                        type="password"
                        className="form-control"
                        id="loginFormInputPassword"
                        required 
                        name="password" 
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
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
  )
}


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
// }




