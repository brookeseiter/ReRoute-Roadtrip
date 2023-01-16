import { 
  GoogleMap, 
  DirectionsService, 
  DirectionsRenderer, 
  useJsApiLoader, 
  MarkerF, 
  InfoWindowF, 
  CircleF } from "@react-google-maps/api";
import { 
  React, 
  useEffect, 
  useRef, 
  useState } from "react";
import Navbar from "../Components/NavBar";
import Modal from "react-bootstrap/Modal";
import  Button from "react-bootstrap/Button";
import Accordion from 'react-bootstrap/Accordion';
import Offcanvas from 'react-bootstrap/Offcanvas';
import StopDetailsPage from './StopDetailsPage';
import { Link } from "react-router-dom";
import usePlacesAutocomplete, {getGeocode, getLatLng} from "use-places-autocomplete";
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption} from "@reach/combobox";

const center = {
  lat: 47.116386, 
  lng: -101.299591
};

export default function CreateRoutePage () {
  const [libraries] = useState(['places', 'geometry']);
  const [inputs, setInputs] = useState({});
  const [mapData, setMapData] =useState([]);
  const [selected, setSelected] = useState(null);
  let [selectedWaypoints, setSelectedWaypoints] = useState([]);
  let [origin, setOrigin] = useState('');
  let [destination, setDestination] = useState('');
  let [waypoints, setWaypoints] = useState([]);
  const [totalDist, setTotalDist] = useState(null);
  const [totalDur, setTotalDur] = useState(null);
  const [routeCenter, setRouteCenter] = useState(null);
  const [routeRadius, setRouteRadius] = useState(null);
  const [isShowing, setIsShowing] = useState(true);
  const [waypointKeys, setWaypointKeys] = useState([]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey:process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries
    // region: 'US'
  });

  const handleRouteChange = (distSum, totRouteTime) => {
    setTotalDist(distSum);
    setTotalDur(totRouteTime);
  }

  const handleRouteCenter = (inBetween, diameter) => {
    setRouteCenter({ lat: inBetween.lat(), lng: inBetween.lng()});
    setRouteRadius(diameter / 2);
  }

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs(values => ({...values, [name]: value}));
  }

  function onClick () {
    setOrigin(inputs.origin);
    setDestination(inputs.destination);
  }

  useEffect(() => {
    fetch('/api/stops/map_data')
        .then((response) => response.json())
        .then((data) => {
            setMapData(data);
        });
  }, []);

  const stopsObj = Object.entries(mapData).map(([key, value]) => ({key, value}));

  function addRouteStop () {
    let selectedWaypoint = {
      location: {
        lat: selected.value.stop_lat,
        lng: selected.value.stop_lng
      },
      stopover: true,
    };
    console.log('LINE 88:', selectedWaypoint);

    setWaypoints(waypoints => [...waypoints, selectedWaypoint]);
    setWaypointKeys(waypointKeys => [...waypointKeys, selected.key]);
    setSelectedWaypoints(selectedWaypoints => [...selectedWaypoints, selected]);
    setIsShowing(false);
    console.log(selectedWaypoints.includes(selected.value.stop_lat, 0));
    // if error directions returned no route appears, remove line below
    console.log(waypoints);
    console.log(waypointKeys);
    setSelected(null);
  }
  // console.log(waypointKeys);
  
  function deleteRouteStop () {
    console.log(selected);
    console.log(waypoints);

    const indexOfRouteWaypoint = waypoints.findIndex(waypoint => {
      return waypoint.location.lat === selected.value.stop_lat;
    });

    waypoints.splice(indexOfRouteWaypoint, 1);
    setWaypoints(waypoints => [...waypoints]);

    const indexOfWaypointKeys = waypointKeys.findIndex(waypointKey => {
      return waypointKey === selected.key;
    });

    waypointKeys.splice(indexOfWaypointKeys, 1);
    setWaypointKeys(waypointKeys => [...waypointKeys]);


    const indexOfAccordionWaypoint = selectedWaypoints.findIndex(selectedWaypoint => {
      return selectedWaypoint.value.stop_lat === selected.value.stop_lat;
    });
    
    selectedWaypoints.splice(indexOfAccordionWaypoint, 1);
    setSelectedWaypoints(selectedWaypoints => [...selectedWaypoints]);
  }
  
  return (
    <div className="create-route-page">
      <Navbar />
      <div className="create-route-page-content container">
        <div className="row align-items-center">
          <h1>Create a Route</h1>
          <form className="create-route-form">
            <div className="row">
              <div className="col">
                <label 
                  htmlFor="origin"
                  className="form-label"
                >
                  Origin
                 
                <input 
                  id="origin"
                  className="form-control"
                  type="text"
                  name="origin"
                  value={inputs.origin || ""}
                  onChange={handleChange}
                  placeholder="Origin address"
                />
                </label>
              </div>
              <div className="col">
                <label 
                  htmlFor="destination"
                  className="form-label"
                >
                  Destination
                <input 
                  id="destination"
                  className="form-control"
                  type="text"
                  name="destination"
                  value={inputs.destination || ""}
                  onChange={handleChange}
                  placeholder="Destination address"
                />
                {/* {
                  isLoaded &&
                  <PlacesAutocomplete />
                } */}
                </label>
              </div>
              <div className="row justify-content-center">
                <button 
                  className='btn btn-primary col-md-2' 
                  type='button' 
                  onClick={onClick}
                >
                  Build Route
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="row map-content">  
          <div className="col">
            {
              (origin !== "") && (
                <DirectionsAccordion 
                  origin={origin} 
                  destination={destination} 
                  waypoints={selectedWaypoints} 
                />
              ) 
            }
          </div>
          <div className="col">
            { totalDist &&
              <div className="route-info">
                <p>Total Route Distance: {totalDist} mi</p>
                <p>Total Route Duration: {totalDur}</p>
              </div>
            }
            {
              isLoaded === true &&
              origin !== "" &&
              <GoogleMap
                id='direction-example'
                mapContainerStyle={{
                  height: '400px',
                  width: '500px'
                }}
                zoom={3.5}
                center={
                  center
                }
                options={{
                  streetViewControl: false,
                  fullscreenControl: false,
                  mapTypeControl: false,
                  controlSize: 36,
                  gestureHandling: "cooperative"
                }}
              >
                {origin !== '' &&
                  destination !== '' && (
                    <>
                    <Directions 
                      origin={origin} 
                      destination={destination} 
                      waypoints={waypoints} 
                      handleRouteChange={handleRouteChange}
                      handleRouteCenter={handleRouteCenter}
                    />
                    <MarkerF position={routeCenter} />
                    <CircleF 
                      center={routeCenter} 
                      radius={routeRadius} 
                      visible={false}
                    />
                    
                    { stopsObj && routeCenter &&
                      stopsObj.map((stopObj) => (
                        <MarkerF  
                          key={stopObj.key}
                          position={{ lat: stopObj.value.stop_lat, lng: stopObj.value.stop_lng}}
                          //onClick if you want to revert this to a click event
                          onMouseOver={() => {
                            setSelected(stopObj);
                            console.log(stopObj);
                          }}
                          visible={
                            isWithinBounds(
                              routeCenter.lat, 
                              routeCenter.lng, 
                              stopObj.value.stop_lat, 
                              stopObj.value.stop_lng, 
                              routeRadius)
                          }
                        />
                    ))}
                    {selected ? (
                                    <InfoWindowF
                                        selected={selected}
                                        position={{ lat: selected.value.stop_lat + 0.1, lng: selected.value.stop_lng}} 
                                        onCloseClick={() => {
                                            setSelected(null);
                                        }}
                                    >
                                      <div>
                                        <h2>{selected.value.stop_name}</h2>
                                        <p>Category: {selected.value.stop_category}</p>
                                        {console.log('CONDITIONAL', waypointKeys.includes(selected.key))}
                                        {console.log('WAYPOINTKEYS', waypointKeys)}
                                        {console.log('SELECTEDKEY', selected.key)}
                                        {console.log('TYPE SELECTEDKEY', (typeof selected.key))}
                                        {waypointKeys.includes(selected.key) ?
                                          (<button className="infowindow" onClick={() => {
                                            deleteRouteStop(selected);
                                            setSelected(null);
                                          }}>Remove from Route</button>) :
                                          <button className="infowindow" onClick={() => {
                                            addRouteStop(selected);
                                          }}>Add to Route</button>
                                        }
                                      </div>
                                    </InfoWindowF>
                                ) : null
                    }
                  </>
                )}
              </GoogleMap>
            }
            { totalDist &&
              <button
                type="button"
                className="btn btn-primary get-directions"
                data-bs-toggle="modal"
                data-bs-target="#directionsModal"
                onClick={() => {
                    document.getElementById('directionsModal').style.display = 'block';
                    document.getElementById('directionsModal').style.opacity = 1;
                }} 
              >
                Get Directions
              </button> 
            }
          </div>
        </div>
        <div
          id="directionsModal"
          className="modal fade"
          role="dialog"
          aria-labelledby="directionsModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-md modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-3" id="directionsModalLabel">
                  Directions
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    document.getElementById('directionsModal').style.display = 'none';
                    document.getElementById('directionsModal').style.opacity = 0;
                  }}
                >
                </button>
              </div>
              <div className="modal-body" id="panel"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Directions = props => {
  const [directions, setDirections] = useState();
  const { origin, destination, waypoints, handleRouteChange, handleRouteCenter} = props;
  const count = useRef(0);

  const options = {
    polylineOptions: {
      strokeWeight: 4,
      strokeOpacity: 0.8
    }
  };
 
  useEffect(() => {
    count.current = 0;
  }, [origin, destination, waypoints]);

  const directionsCallback = (result, status) => {
    if (status === "OK" && count.current === 0) {
      const distList = [];
      let totTime = 0;
      count.current += 1;
      setDirections(result);
      for (const directionLeg of result.routes[0].legs) {
        const legDist = parseInt(directionLeg.distance.text.slice(0, -3));
        const legTime = directionLeg.duration.value;
        distList.push(legDist);
        totTime += legTime
      }

      let distSum = 0;
      distList.forEach( num => {
        distSum += num;
      });

      const totRouteTime = secondsToDHM(totTime);

      handleRouteChange(distSum, totRouteTime);

      if (result.routes[0].legs.length === 1) {
        // const originalDist = parseInt(result.routes[0].legs[0].distance.text.slice(0, -3));
        // console.log('original dist:', originalDist);

        const originLat = result.routes[0].legs[0].start_location.lat();
        const originLng = result.routes[0].legs[0].start_location.lng();
        const destinationLat = result.routes[0].legs[0].end_location.lat();
        const destinationLng = result.routes[0].legs[0].end_location.lng();
       
        const originCoords = { lat: originLat, lng: originLng };
        const destinationCoords = { lat: destinationLat, lng: destinationLng };

        var diameter = window.google.maps.geometry.spherical.computeDistanceBetween(originCoords, destinationCoords);
        var inBetween = window.google.maps.geometry.spherical.interpolate(originCoords, destinationCoords, 0.5);
        handleRouteCenter(inBetween, diameter);
      }
    }
  };

  return (
     <div className="Directions">
        <DirectionsService
          options={{
            destination,
            origin,
            travelMode: "DRIVING",
            waypoints,
            optimizeWaypoints: true
          }}
          callback={directionsCallback}
        />
        <DirectionsRenderer 
          directions={directions} 
          options={options} 
          panel={document.getElementById('panel')} 
        />
    </div>
  );
};

function DirectionsAccordion ({ origin, destination, waypoints }) { 
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // function handleCanvas () {
  //   return (
      
  //   );
  // }

  return (
    <div class="accordion" id="accordionPanelsStayOpen">
      <div class="padding">
        <div class="row d-flex">
          <div class="grid-margin stretch-card">
            <div class="card">
              <div class="card-body">
                {/* <h4 class="card-title">Route Stats</h4>
                { totalDist &&
                  <div className="route-info">
                    <p>Total Route Distance: {totalDist} mi</p>
                    <p>Total Route Duration: {totalDur}</p>
                  </div>
                }
                <br /> */}
                <h4 class="card-title">Route Stops</h4>
                <div class="mt-4">
                  <Accordion className="accordion" defaultActiveKey="0">
                    <Accordion.Item className="card" eventKey="0">
                      <Accordion.Header className="card-header">Origin</Accordion.Header>
                      <Accordion.Body className="card-body">
                        <p className="mb-0">{origin}</p>
                      </Accordion.Body>
                    </Accordion.Item>
                    {waypoints.map((waypoint) => ( 
                      <Accordion.Item className="card" eventKey="1" key={waypoint.key}>
                        <Accordion.Header className="card-header">{waypoint.value.stop_name}</Accordion.Header>
                        <Accordion.Body className="card-body">
                          <p className="mb-0">Category: {waypoint.value.stop_category}</p>
                          <p className="mb-0">Latitude: {waypoint.value.stop_lat}</p>
                          <p className="mb-0">Longitude: {waypoint.value.stop_lng}</p>
                          {/* <Button 
                            variant="primary" 
                            // onClick={handleShow}
                            onClick={
                              
                              handleShow
                              // <Link to={`/stops/${waypoint.value.stop_id}`} />;
                              
                            }
                          >
                            Launch
                          </Button> */}

                          <Offcanvas show={show} onHide={handleClose}>
                            <Offcanvas.Header closeButton>
                              <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                              {/* <StopDetailsPage stopId={waypoint.value.stop_id}/> */}
                            </Offcanvas.Body>
                          </Offcanvas>

                        </Accordion.Body>
                      </Accordion.Item>
                    ))}
                    <Accordion.Item className="card" eventKey="2">
                      <Accordion.Header className="card-header">Destination</Accordion.Header>
                      <Accordion.Body className="card-body">
                      <p className="mb-0">{destination}</p>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Wilson Lee :https://stackoverflow.com/questions/37096367/how-to-convert-seconds-to-minutes-and-hours-in-javascript
function secondsToDHM(s) {
  s = Number(s);
  var d = Math.floor(s / 86400);
  var h = Math.floor(s % 86400 / 3600);
  var m = Math.floor(s  % 86400 % 3600 / 60);

  var dDisplay = d > 0 ? d + (d === 1 ? " day, " : " days, ") : "";
  var hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : "";
  var mDisplay = m > 0 ? m + (m === 1 ? " minute, " : " minutes") : "";
  
  var timeDisplay = dDisplay + hDisplay + mDisplay
  return timeDisplay; 
}

// Chris Panayotoff: https://stackoverflow.com/questions/4057665/google-maps-api-v3-find-nearest-markers
function isWithinBounds(lat1, lng1, lat2, lng2, routeRad) {
  var radlat1 = Math.PI * lat1 / 180;
  var radlat2 = Math.PI * lat2 / 180;
  var theta = lng1 - lng2;
  var radtheta = Math.PI * theta / 180;
  var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = dist * 180 / Math.PI;
  // dist in miles
  dist = dist * 60 * 1.1515;

  // distFromRouteCenter in miles
  const distFromRouteCenter = routeRad * 0.000621371

  if (dist > distFromRouteCenter) {
    return false;
  }
  else {
    return true;
  }
}

// function StandaloneSearchBox({ panTo }) {
//   const {
//       ready, 
//       value, 
//       suggestions : {status, data}, 
//       setValue, 
//       clearSuggestions} 
//       = usePlacesAutocomplete({
//       requestOptions: {
//           location: { lat: () => 37.2982, lng: () => -113.0263 },
//           radius: 50 * 1600,
//       },
//   });
  
//   return (
//       <Combobox 
//           style={{width: '400px'}}
//           onSelect={async (address) => {
//               setValue(address, false);
//               clearSuggestions();
//               try {
//                   const results = await getGeocode({address});
//                   const { lat, lng } = getLatLng(results[0]);
//                   panTo({ lat, lng });
//                   console.log(lat, lng);
//               } catch(error) {
//                   console.log("There was an error.");
//               }
//           }}
//       >
//           <ComboboxInput 
//               id="create-stop-search"
//               value={value} 
//               onChange={(e) => {
//                   setValue(e.target.value);
//               }} 
//               disabled={!ready}
//               placeholder="Enter an address near your stop"
//           />
//           <ComboboxPopover>
//               <ComboboxList>
//                   {status === "OK" && 
//                       data.map(({id, description}) => (
//                           <ComboboxOption id="create-stop-search-option" key={id} value={description} />
//                       ))}
//               </ComboboxList>
//           </ComboboxPopover>
//       </Combobox>
//   );
// }

// const PlacesAutocomplete = () => {
//   const {
//     ready,
//     value,
//     suggestions: { status, data },
//     setValue,
//   } = usePlacesAutocomplete();

//   const handleInput = (e) => {
//     setValue(e.target.value);
//   };

//   const handleSelect = (val) => {
//     setValue(val, false);
//   };

//   return (
//     <Combobox onSelect={handleSelect} aria-labelledby="demo">
//       <ComboboxInput value={value} onChange={handleInput} disabled={!ready} />
//       <ComboboxPopover>
//         <ComboboxList>
//           {status === "OK" &&
//             data.map(({ place_id, description }) => (
//               <ComboboxOption key={place_id} value={description} />
//             ))}
//         </ComboboxList>
//       </ComboboxPopover>
//     </Combobox>
//   );
// };
