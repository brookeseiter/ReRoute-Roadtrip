import RouteMap from "../Components/RouteMap.js";
import { useState } from "react";

const CreateRoutePage = () => {
    const [inputs, setInputs] = useState({});

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        // const body = {
        //     user_id: sessionStorage.user_id,
        //     start: inputs.start,
        //     end: inputs.end
        // }

    }

    return ( 
        <div className="CreateRoutePage">
            <div className="CreateRouteContent">
            <h2>Create a Route</h2>
            </div>
            {/* <form className='CreateRouteForm'>
                <label>Starting Point:</label>
                <input 
                    type='text' 
                    required 
                    name='start' 
                    value={inputs.start || ''}
                    onChange={handleChange}
                />
                <label>Final Destination:</label>
                <input 
                    type='text' 
                    required 
                    name='end' 
                    value={inputs.end || ''}
                    onChange={handleChange}
                />
                <button onClick={handleSubmit}>Get Route</button>
            </form> */}
            <p>Enter origin and destination addresses to receive your route.</p>
            <RouteMap />
        </div>
    );
}
 
export default CreateRoutePage;

