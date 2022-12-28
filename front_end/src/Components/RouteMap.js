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
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
  } from "@reach/accordion";
import "@reach/accordion/styles.css";

const center = {
  lat: 47.116386, 
  lng: -101.299591
};

export default function RouteMap () {
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
    console.log('SELECTED:', selected);
    let selectedWaypoint = {
      location: {
        lat: selected.value.stop_lat,
        lng: selected.value.stop_lng
      },
      stopover: true,
    };
    setWaypoints(waypoints => [...waypoints, selectedWaypoint]);
    setSelectedWaypoints(selectedWaypoints => [...selectedWaypoints, selected]);
    // if error directions returned no route appears, remove line below
    setSelected(null);
  }

  function deleteRouteStop () {

    const indexOfRouteWaypoint = waypoints.findIndex(waypoint => {
      return waypoint.location.lat === selected.value.stop_lat;
    });

    waypoints.splice(indexOfRouteWaypoint, 1);
    setWaypoints(waypoints => [...waypoints]);

    const indexOfAccordionWaypoint = selectedWaypoints.findIndex(selectedWaypoint => {
      return selectedWaypoint.value.stop_lat === selected.value.stop_lat;
    });
    
    selectedWaypoints.splice(indexOfAccordionWaypoint, 1);
    setSelectedWaypoints(selectedWaypoints => [...selectedWaypoints]);
  }
  
  return (
    <div className='map'>
      <div className='map-settings'>
        <hr className='mt-0 mb-3' />

        <div className='row'>
          <div className='col-md-6 col-lg-4'>
            <div className='form-group'>
              <label htmlFor='ORIGIN'>Origin</label>
              <br />
              <input 
                  id='ORIGIN' 
                  className='form-control' 
                  type='text' 
                  name='origin'
                  value={inputs.origin || ""}
                  onChange={handleChange}
              />
            </div>
          </div>

          <div className='col-md-6 col-lg-4'>
            <div className='form-group'>
              <label htmlFor='DESTINATION'>Destination</label>
              <br />
              <input 
                  id='DESTINATION' 
                  className='form-control' 
                  type='text' 
                  name='destination'
                  value={inputs.destination || ""}
                  onChange={handleChange}
              />
            </div>
          </div>
          <button className='btn btn-primary' type='button' onClick={onClick}>
            Build Route
          </button>
          {
            (origin !== '') && (
              <DirectionsAccordion 
                origin={origin} 
                destination={destination} 
                waypoints={selectedWaypoints} 
              />
            ) 
          }
        </div>
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
                                      <button onClick={addRouteStop}>Add to Route</button>
                                      <button onClick={() => {
                                        deleteRouteStop(selected);
                                        setSelected(null);
                                      }}>Remove from Route</button>
                                  </div>
                              </InfoWindowF>
                          ) : null
              }
              </>
            )}

        </GoogleMap>
      }
      { totalDist &&
        <div className="route-info">
         <p>Total Route Distance: {totalDist} mi</p>
         <p>Total Route Duration: {totalDur}</p>
        </div>
      }
      <div id="panel"></div>
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
      strokeWeight: 6,
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
        <div className="DirectionsAccordion">
          <Accordion collapsible multiple>
            <AccordionItem>
              <h3>
                <AccordionButton>Origin</AccordionButton>
              </h3>
              <AccordionPanel>
                {origin}
              </AccordionPanel>
            </AccordionItem>
            {waypoints.map((waypoint) => ( 
              <AccordionItem key={waypoint.key}>
                <h3>
                  <AccordionButton>{waypoint.value.stop_name}</AccordionButton>
                </h3>
                <AccordionPanel>
                  <p>Category: {waypoint.value.stop_category}</p>
                  <p>Latitude: {waypoint.value.stop_lat}</p>
                  <p>Longitude: {waypoint.value.stop_lng}</p>
                </AccordionPanel>
              </AccordionItem>
            ))}
            <AccordionItem>
              <h3>
                <AccordionButton>Destination</AccordionButton>
              </h3>
              <AccordionPanel>
                {destination}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
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





