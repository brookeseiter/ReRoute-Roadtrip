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
  console.log(waypointKeys);
  
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
          <h2>Create a Route</h2>
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
                />
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
        <div className="row">  
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
                                              (<button onClick={() => {
                                                deleteRouteStop(selected);
                                                setSelected(null);
                                              }}>Remove from Route</button>) :
                                              <button onClick={() => {
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
                id="getDirections"
                className="btn btn-lg btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#small_modal"
                onClick={() => {
                    document.getElementById('small_modal').style.display = 'block';
                    document.getElementById('small_modal').style.opacity = 1;
                }} 
              >
                Get Directions
              </button>
            }
          </div>
        </div>


      {/* modal start */}
      <div
        id="small_modal"
        className="modal fade"
        role="dialog"
        aria-labelledby="mySmallModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-md modal-dialog-scrollable">
          <div className="modal-content shadow-max modal-dialog-scrollable">
            <div className="modal-header">
              <h3 className="modal-title" id="exampleModalLabel1">
                Directions
              </h3>
              <button
                type="button"
                className="close icon"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  document.getElementById('small_modal').style.display = 'none';
                  document.getElementById('small_modal').style.opacity = 0;
      
              }}
              >
                close
              </button>
            </div>
            <div className="modal-body modal-dialog-scrollable" id="panel">

            </div>
          </div>
        </div>
      </div>

     
      </div>
      </div>
  );
};

const Directions = props => {
  const [directions, setDirections] = useState();
  const { origin, destination, waypoints, handleRouteChange, handleRouteCenter } = props;
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

  return (
    <div class="accordion" id="accordionPanelsStayOpen">
      <div class="accordion-item">
        <h2 class="accordion-header" id="panelsStayOpen-headingOne">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
            Origin
          </button>
        </h2>
        <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
          <div class="accordion-body">
            <strong>{origin}</strong> 
          </div>
        </div>
      </div>
      {waypoints.map((waypoint) => ( 
        <div class="accordion-item" key={waypoint.key}>
          <h2 class="accordion-header" id="panelsStayOpen-headingOne">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
              {waypoint.value.stop_name}
            </button>
          </h2>
          <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
            <div class="accordion-body">
              <strong>
                  <p>Category: {waypoint.value.stop_category}</p>
                  <p>Latitude: {waypoint.value.stop_lat}</p>
                  <p>Longitude: {waypoint.value.stop_lng}</p>
              </strong> 
            </div>
          </div>
        </div>
      ))}
      <div class="accordion-item">
        <h2 class="accordion-header" id="panelsStayOpen-headingOne">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
            Destination
          </button>
        </h2>
        <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
          <div class="accordion-body">
            <strong>{destination}</strong> 
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



