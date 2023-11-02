import { useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import usePlacesAutocomplete, {getGeocode, getLatLng} from "use-places-autocomplete";
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption} from "@reach/combobox";
import "@reach/combobox/styles.css";
import Navbar from "../Components/NavBar";
import Spinner from 'react-bootstrap/Spinner';


const center = {
    lat: 37.733795, 
    lng: -122.446747
};

export default function CreateStopPage ({ 
    user, 
    isLoggedIn, 
    currentUser, 
    loading 
}) {
    const mapRef = useRef();
    const [libraries] = useState(['places','geometry']);
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    let [catChoice, setCatChoice] = useState("");
    let [marker, setMarker] = useState([]);

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
        const stopInfo = {
            userId: currentUser,
            stopCategory: catChoice,
            stopName: inputs.stopName,
            stopLat: marker.lat,
            stopLng: marker.lng,
        }
        console.log(stopInfo);

        const requestOptions = {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(stopInfo)
        }

        fetch('/create-stop', requestOptions)
            .then(response => response.json())
            .then((stopData) => {
                console.log(stopData);
                const stopId= stopData.stop_id;
                navigate(`/stops/${stopId}`); 
            })
            .catch(error => console.log(error))
        console.log('handleSubmit triggered');
        console.log(inputs);
        console.log(stopInfo);
    }

    console.log('currentUser CreateStopPage:', currentUser);

    if (!isLoaded) return (
        <>
            <Navbar />
            <Spinner animation="border" />
        </>
    )
    return ( 
        <div className="create-stop-page" onSubmit={handleSubmit}>
            <Navbar />
            {loading ? <Spinner animation="border" /> :
                <div className="create-stop-page-content container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1>Create A Stop</h1>
                            <p>Click the map to drop a pin at approximate location of your stop</p>
                            <StandaloneSearchBox panTo={panTo} />
                            <br />
                        </div>
                    </div>
                    {loading ? <Spinner animation="border" /> :
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
                                        htmlFor="stop-name-input" 
                                        className="create-stop-form-input"
                                    >
                                        Stop Name
                                    <input 
                                        type="text" 
                                        name="stopName"
                                        id="stop-name-input"
                                        value={inputs.stopName || ""}
                                        onChange={handleChange}
                                        placeholder="Name your stop"
                                        required 
                                    />
                                    </label>
                                    <label 
                                        htmlFor="stop-lat-input" 
                                        className="create-stop-form-input"
                                    >
                                        Stop Latitutde
                                    <input 
                                        type="text" 
                                        name="stopLat"
                                        id="stop-lat-input"
                                        value={marker.lat || ""}
                                        onChange={handleChange} 
                                        placeholder="Drop a pin on map"
                                        required 
                                    />
                                    </label>
                                    <label 
                                        htmlFor="stop-lng-input" 
                                        className="create-stop-form-input"
                                    >
                                        Stop Longitude
                                    <input 
                                        type="text"
                                        name="stopLng" 
                                        id="stop-lng-input"
                                        value={marker.lng || ""}
                                        onChange={handleChange}
                                        placeholder="Drop a pin on map"
                                        required 
                                    />
                                    </label>
                                    <label
                                        htmlFor="stop-category-select"
                                        className="create-stop-form-select"
                                    >
                                        Stop Category
                                    </label>
                                    <select 
                                        name="stopCategory" 
                                        id="stop-category-select" 
                                        value={catChoice} 
                                        onChange={(e) => {
                                            catChoice = e.target.value;
                                            setCatChoice(catChoice);
                                            console.log(catChoice);
                                        }}
                                        required
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
                    }
                </div>
            }
        </div>
    );
};

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
};
 
