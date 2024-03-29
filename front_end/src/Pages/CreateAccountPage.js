import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';


export default function CreateAccountPage ({ loading }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNum, setPhoneNum] = useState("");

    const handleSignUp = (e) => {
        e.preventDefault();
        const userInfo = {
            email: email,
            username: username,
            password: password,
            phoneNum: phoneNum
        };

        const requestOptions = {
            credentials: 'same-origin',
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        };

        fetch(`/register`, requestOptions)
        .then((response) => response.ok ? response.json() : Promise.reject(response))
        .then((userData) => {
            alert('Account created successfully, Please log in.');
            navigate('/');
        })
        .catch((error) => {
            console.log('error: ', error);
            alert('An account already exists with this username/email. Please try again.');
        }, []); 
    };

    return ( 
        <div className="create-account-page" onSubmit={handleSignUp}>
            <nav className="navbar navbar-expand-lg bg-body-tertiary container">
                <div className="navbar-brand">
                    <Link to="/" >
                        <img 
                            src='../Images/logo.webp' 
                            className="d-inline-block align-text-center" 
                            id="Logo"
                            alt=''
                            width="80"
                            height="80"
                        />  
                        <h1 className="d-inline-block"> ReRoute Roadtrip</h1>
                    </Link>
                </div>
            </nav>
            {loading ? <Spinner animation="border" /> :
                <div className="create-account-page-content container">
                    <div className="row">
                        <div className="col">
                            <h1>Create An Account</h1>
                            <form className="create-account-form">
                                <div className="mb-3">
                                    <label htmlFor="email-input" className="create-account-input">
                                    <input 
                                        className="create-account-input"
                                        type="text"
                                        name="email"
                                        id="email-input" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email"
                                        required
                                    />
                                    </label>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="username-input" className="create-account-input">
                                    <input 
                                        className="create-account-input"
                                        type="text"
                                        name="username" 
                                        id="username-input"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="Username"
                                        required
                                    />
                                    </label>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password-input" className="create-account-input">
                                    <input 
                                        className="create-account-input"
                                        type="password"
                                        name="password" 
                                        id="password-input"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                        required
                                    />
                                    </label>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phone-num-input" className="create-account-input">
                                    <input 
                                        className="create-account-input"
                                        type="text"
                                        name="phoneNum" 
                                        id="phone-num-input"
                                        value={phoneNum}
                                        onChange={(e) => setPhoneNum(e.target.value)}
                                        placeholder="Phone Number"
                                        required
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
            }
        </div>
     );
}




// OG
// export default function CreateAccountPage () {
//     const [inputs, setInputs] = useState({});
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
//             username: inputs.username,
//             password: inputs.password,
//             phone_num: inputs.phone_num
//         }

//         const requestOptions = {
//             credentials: 'same-origin',
//             method: 'POST',
//             headers: {
//                 'content-type': 'application/json'
//             },
//             body: JSON.stringify(body)
//         }

//         fetch('/register', requestOptions)
//             .then(response => response.ok ? response.json() : Promise.reject(response))
//             .then(data => {
//                 console.log('data:', data);
//                 setIsLoggedIn(true);
//                 // setUser(data);
//                 alert('Account created successfully, Please log in.');
//                 navigate('/');
//             })
//             .catch(error => {
//                 console.log('error: ', error);
//                 alert('An account already exists with this username/email. Please try again.');
//             });   
//     }

//     return ( 
//         <div className="create-account-page" onSubmit={handleSubmit}>
//             <nav className="navbar navbar-expand-lg bg-body-tertiary container">
//                 <div className="navbar-brand">
//                     <img 
//                         src='../Images/logo.png' 
//                         className="d-inline-block align-text-center" 
//                         id="Logo"
//                         alt=''
//                         width="80"
//                         height="80"
//                     />  
//                     <h1 className="d-inline-block"> ReRoute Roadtrip</h1>
//                 </div>
//             </nav>
//             <div className="create-account-page-content container">
//                 <div className="row">
//                     <div className="col">
//                         <h1>Create An Account</h1>
//                         <form className="create-account-form">
//                             <div className="mb-3">
//                                 <label htmlFor="createAccountFormInput" className="form-label">
//                                 <input 
//                                     type="text"
//                                     className="form-control"
//                                     id="createAccountFormInput"
//                                     name="email" 
//                                     value={inputs.email || ""}
//                                     onChange={handleChange}
//                                     placeholder="Email"
//                                 />
//                                 </label>
//                             </div>
//                             <div className="mb-3">
//                                 <label htmlFor="createAccountFormInput" className="form-label">
//                                 <input 
//                                     type="text"
//                                     className="form-control"
//                                     id="createAccountFormInput"
//                                     name="username" 
//                                     value={inputs.username || ""}
//                                     onChange={handleChange}
//                                     placeholder="Username"
//                                 />
//                                 </label>
//                             </div>
//                             <div className="mb-3">
//                                 <label htmlFor="createAccountFormInput" className="form-label">
//                                 <input 
//                                     type="text"
//                                     className="form-control"
//                                     id="createAccountFormInput"
//                                     name="password" 
//                                     value={inputs.password || ""}
//                                     onChange={handleChange}
//                                     placeholder="Password"
//                                 />
//                                 </label>
//                             </div>
//                             <div className="mb-3">
//                                 <label htmlFor="createAccountFormInput" className="form-label">
//                                 <input 
//                                     type="text"
//                                     className="form-control"
//                                     id="createAccountFormInput"
//                                     name="phone_num" 
//                                     value={inputs.phone_num || ""}
//                                     onChange={handleChange}
//                                     placeholder="Phone Number"
//                                 />
//                                 </label>
//                             </div>
//                             <button>Submit</button>
//                             <br />
//                             <small>
//                                 Already have an account? 
//                                 <br /> 
//                                 <Link to='/'>Log In</Link>
//                             </small>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//      );
// }
