import { useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import usePlacesAutocomplete, {getGeocode, getLatLng} from "use-places-autocomplete";
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption} from "@reach/combobox";
import "@reach/combobox/styles.css";
import Navbar from "../Components/NavBar";

const center = {
    lat: 37.733795, 
    lng: -122.446747
};

export default function CreateStopPage (props) {
    const mapRef = useRef();
    const [libraries] = useState(['places','geometry']);
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    let [catChoice, setCatChoice] = useState("");
    let [marker, setMarker] = useState([]);
    const {user, isLoggedIn, Loading} = props

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey:process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        libraries
        // region: 'US'
    });

    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);

    const panTo = useCallback(({lat, lng}) => {
        mapRef.current.panTo({lat, lng});
        mapRef.current.setZoom(12);
    }, []);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const body = {
            user_id: user.user_id,
            stop_category: catChoice,
            stop_name: inputs.stop_name,
            stop_lat: marker.lat,
            stop_lng: marker.lng,
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(body)
        }

        fetch('/create-stop', requestOptions)
            .then(response => response.json())
            .then((data) => {
                const stop_id= data.stop_id;
                navigate(`/stops/${stop_id}`); 
            })
            .catch(error => console.log(error))
        console.log('handleSubmit triggered');
        console.log(inputs);
        console.log(body);
    }

    console.log(user);

    if (!isLoaded) return <div>Loading...</div>
    return ( 
        <div className="create-stop-page" onSubmit={handleSubmit}>
            <Navbar />
            <div className="create-stop-page-content container">
                <div className="row">
                    <div className="col-md-12">
                        <h1>Create A Stop</h1>
                        <p>Click the map to drop a pin at approximate location of your stop</p>
                        <StandaloneSearchBox panTo={panTo} />
                        <br />
                    </div>
                </div>
                <div className="row g-3">
                    <div className="map-content col-md-6">
                        <GoogleMap 
                            zoom={10} 
                            center={center} 
                            mapContainerClassName="map-container"
                            mapContainerStyle={{
                                height: '395px',
                                width: '530px'
                            }}
                            onClick={(e) => {
                                marker = {
                                    lat: e.latLng.lat(),
                                    lng: e.latLng.lng()};
                                setMarker(marker);
                                console.log(marker);
                            }}
                            options={{
                                streetViewControl: false,
                                fullscreenControl: false,
                                mapTypeControl: false,
                                controlSize: 36,
                                gestureHandling: "cooperative"
                                }}
                            onLoad={onMapLoad}
                        >
                            {marker.lat ? (<MarkerF position={{ lat: marker.lat, lng: marker.lng }} />) : null}
                        </GoogleMap>
                    </div>
                    <div className="col-md-6">
                        <form className="create-stop-form">
                            <label 
                                htmlFor="create-stop-form-input" 
                                className="form-label"
                            >
                                Stop Name
                            <input 
                                type="text" 
                                className="form-control"
                                id="create-stop-form-input"
                                required 
                                name="stop_name"
                                value={inputs.stop_name || ""}
                                onChange={handleChange}
                                placeholder="Name your stop"
                            />
                            </label>
                            <label 
                                htmlFor="create-stop-form-input" 
                                className="form-label"
                            >
                                Stop Latitutde
                            <input 
                                type="text" 
                                className="form-control"
                                id="create-stop-form-input"
                                required 
                                name="stop_lat"
                                value={marker.lat || ""}
                                onChange={handleChange} 
                                placeholder="Drop a pin on map"
                            />
                            </label>
                            <label 
                                htmlFor="create-stop-form-input" 
                                className="form-label"
                            >
                                Stop Longitude
                            <input 
                                type="text"
                                className="form-control"
                                id="create-stop-form-input"
                                required 
                                name="stop_lng" 
                                value={marker.lng || ""}
                                onChange={handleChange}
                                placeholder="Drop a pin on map"
                            />
                            </label>
                            <label>Stop Category</label>
                            <select 
                                className="form-select"
                                name="stop_category" 
                                id="stop-category-select" 
                                value={catChoice} 
                                onChange={(e) => {
                                    catChoice = e.target.value;
                                    setCatChoice(catChoice);
                                    console.log(catChoice);
                                }}
                            >
                                <option value="Camping">Camping</option>
                                <option value="Caverns">Caverns</option>
                                <option value="Climbing Access/Scrambling">Climbing Access/Scrambling</option>
                                <option value="Hiking">Hiking</option>
                                <option value="National Monument">National Monument</option>
                                <option value="National Park">National Park</option>
                                <option value="Picnic Area">Picnic Area</option>
                                <option value="State Park">State Park</option>
                                <option value="Swimming Hole">Swimming Hole</option>
                                <option value="Unique Find">Unique Find</option>
                                <option value="View Point">View Point</option>
                                <option value="Water Access">Water Access</option>
                            </select>
                            <button>Create Stop</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StandaloneSearchBox({ panTo }) {
    const {
        ready, 
        value, 
        suggestions : {status, data}, 
        setValue, 
        clearSuggestions} 
        = usePlacesAutocomplete({
        requestOptions: {
            location: { lat: () => 37.2982, lng: () => -113.0263 },
            radius: 50 * 1600,
        },
    });
    
    return (
        <Combobox 
            style={{width: '400px'}}
            onSelect={async (address) => {
                setValue(address, false);
                clearSuggestions();
                try {
                    const results = await getGeocode({address});
                    const { lat, lng } = getLatLng(results[0]);
                    panTo({ lat, lng });
                    console.log(lat, lng);
                } catch(error) {
                    console.log("There was an error.");
                }
            }}
        >
            <ComboboxInput 
                id="create-stop-search"
                value={value} 
                onChange={(e) => {
                    setValue(e.target.value);
                }} 
                disabled={!ready}
                placeholder="Enter an address near your stop"
            />
            <ComboboxPopover>
                <ComboboxList>
                    {status === "OK" && 
                        data.map(({id, description}) => (
                            <ComboboxOption id="create-stop-search-option" key={id} value={description} />
                        ))}
                </ComboboxList>
            </ComboboxPopover>
        </Combobox>
    );
}
 
