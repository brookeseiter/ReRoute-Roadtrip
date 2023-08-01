import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, redirect } from "react-router-dom";
// import { useContext } from "react";
// import { Context } from "../Storage/appContext";


export default function LoginPage ({loading}) {
    const navigate = useNavigate();
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const [user, setUser] = useState({});
    const[isLoggedIn, setIsLoggedIn] = useState(false);

    const updateEmail = evt => {
        setEmail(evt.target.value);
    };

    const updatePassword = evt => {
        setPassword(evt.target.value);
    };

    const confirmLogin = (user) => {
        if (user === "Incorrect Email") {
          alert("Email and password is incorrect.");
          console.log('in if confirmLogin');
        } else if (user === "Incorrect Password") {
          alert("Password is incorrect.");
          console.log('in else if confirmLogin, incorrect pw');
        } else {
          setIsLoggedIn(true);
          console.log('in else confirmLogin, login confirmed');
        }
      }

    const handleLogin = evt => {
        console.log('in handleLogin');
        console.log('evt:', evt);
        evt.preventDefault();
        const userJson = { 'email': email, 'password': password };
        console.log(userJson);
    
        if (email === "" || password === "") {
          alert("Please enter both email and password.");
        } else {
          fetch(`/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userJson)
          })
            .then((response) => response.json())
            .then((userData) => {
              if (userData==="Incorrect Password" || userData==="Incorrect Email") {
                alert(userData);
                console.log('in if handleLogin');
              } else {
                setUser(userData);
                confirmLogin(userData);
                redirect(`/profile`);
                console.log('in else handleLogin');
                console.log(userData);
                sessionStorage.setItem('userID', userData.user_id);
                const userId = sessionStorage.getItem('userID');
                console.log('USER_ID session storage:', userId);
              }
            })
      }};
    
    console.log(user);



    if (isLoggedIn === true) {
        return navigate(`/profile`);
    } else {
    return ( 
        <div className="login-page">
            <form className='login-form' onSubmit={handleLogin}>
                <div className="mb-3">
                    <label htmlFor="loginFormInputEmail" className="form-label">
                    <input 
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
};
// }

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




