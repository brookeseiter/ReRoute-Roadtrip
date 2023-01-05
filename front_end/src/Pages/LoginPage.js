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
        <div className='LoginPage'>
            <h2>Login</h2>
            {(store.token && store.token !=="" && store.token !==undefined) ? 
            ("You are logged in with this token" + store.token) :
            (<form className='LoginForm'>
                <label>Email:</label>
                <input 
                    type='text' 
                    required 
                    name='email' 
                    value={inputs.email || ''}
                    onChange={handleChange}
                />
                <label>Password:</label>
                <input 
                    type='text' 
                    required 
                    name='password' 
                    value={inputs.password || ''}
                    onChange={handleChange}
                />
                <button onClick={handleSubmit}>Sign In</button>
                <br></br>
                <small>Don't have an account yet? <Link to='/create-account'>Create One!</Link></small>
            </form>
            )}
        </div>
     );
}




