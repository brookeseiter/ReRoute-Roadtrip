// import { GoogleMap, DirectionsService, DirectionsRenderer, DistanceMatrixService, useJsApiLoader, MarkerF, InfoWindowF } from "@react-google-maps/api";
// import { React, useCallback, useEffect, useState } from "react";
// import {
//     Accordion,
//     AccordionItem,
//     AccordionButton,
//     AccordionPanel,
//   } from "@reach/accordion";
// import "@reach/accordion/styles.css";

// const center = {
//     lat: 37.733795, 
//     lng: -122.446747
// };
// export default function RouteMap () {
//     const [libraries] = useState(['places']);
//     const [mapData, setMapData] =useState([]);
//     const [selected, setSelected] = useState(null);
//     const [inputs, setInputs] = useState({});
//     const { isLoaded } = useJsApiLoader({
//         googleMapsApiKey:process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
//         libraries
//     });

//     useEffect(() => {
//         fetch('/api/stops/map_data')
//             .then((response) => response.json())
//             .then((data) => {
//                 setMapData(data);
//             });
//     }, []);

//     const stopsObj = Object.entries(mapData).map(([key, value]) => ({key, value}));
//     // console.log(stopsObj);

//     const [directionsOptions, setDirectionsOptions] = useState({
//         response: null,
//         travelMode: 'DRIVING',
//         origin: '',
//         destination: '',
//     });

//     // const [distanceMatrixOptions, setDistanceMatrixOptions] = useState({
//     //     response: null,
//     //     travelMode: 'DRIVING',
//     //     origins: [],
//     //     destinations: [],
//     //     waypoints: []
//     // });

//   function directionsCallback (response) {
//       console.log('directionsCallbackresponse:', response);
//       console.log('directionsCallbackresponse:', response.request);
//       console.log('directionsCallbackresponse:', response.request.destination);

//     if (response !== null) {
//       if (response.status === 'OK') {
//         setDirectionsOptions(() => ({response}));
//           console.log("dO after setDO directionsCallback:", directionsOptions);
//       } else {
//         console.log('response: ', response);
//       }
//     }
//   }
//   // function distanceMatrixCallback (response) {
//   //     // console.log(response);
//   //     // console.log(response.request);
//   //     // console.log(response.request.destination);

//   //   if (response !== null) {
//   //     if (response.status === 'OK') {
//   //       setDistanceMatrixOptions(() => ({response}));
//   //         console.log("distanceMatrixOptions:", distanceMatrixOptions);
//   //     } else {
//   //       console.log('response: ', response);
//   //     }
//   //   }
//   // }

//   const handleChange = (e) => {
//     const name = e.target.name;
//     const value = e.target.value;
//     setInputs(values => ({...values, [name]: value}));
//     }

//   function onClick () {
//     if (selected) {
      // let selectedWaypoints = [];
      // const selectedWaypoint = {
      //   location: {
      //     lat: selected.value.stop_lat,
      //     lng: selected.value.stop_lng
      //   },
      //   stopover: true,
      // };
//       console.log(selectedWaypoint);
//       selectedWaypoints.push(selectedWaypoint);
//       console.log(selectedWaypoints);
//       setDirectionsOptions( () => ({
//         response: directionsOptions.response,
//         origin: inputs.origin,
//         destination: inputs.destination,
//         travelMode: 'DRIVING',
//         waypoints: selectedWaypoints
//         // waypoints: [
//         //   {
//         //     location:  {lat: selected.value.stop_lat, lng: selected.value.stop_lng},
//         //     stopover: true,
//         //   }]
//       }));
//     }
//     else if (!selected && inputs.origin !== '' && inputs.destination !== '') {
//       console.log('ROUTE 1');
//         setDirectionsOptions( () => ({
//             response: directionsOptions.response,
//             origin: inputs.origin,
//             destination: inputs.destination,
//             travelMode: 'DRIVING',
//             // waypoints: [
//             //   {
//             //     location:  {lat: 38.91200237, lng: -112.5088259},
//             //     stopover: true,
//             //   }]
//         }));
//         // setDistanceMatrixOptions( () => ({
//         //   response: distanceMatrixOptions.response,
//         //   origins: [inputs.origin],
//         //   destinations: [inputs.destination],
//         //   travelMode: 'DRIVING'
//         // }));
//       console.log('in if dO:',directionsOptions);
//       // console.log(distanceMatrixOptions);
//     }

//   }
//   console.log('main func dO:', directionsOptions);

//   function onMapClick (...args) {
//     console.log('onClick args: ', args);
//   }

//   if (!isLoaded) return <div>Loading...</div>
//     return (
//       <div className='map'>
//         <div className='map-settings'>
//           <hr className='mt-0 mb-3' />

//           <div className='row'>
//             <div className='col-md-6 col-lg-4'>
//               <div className='form-group'>
//                 <label htmlFor='ORIGIN'>Origin</label>
//                 <br />
//                 <input 
//                     id='ORIGIN' 
//                     className='form-control' 
//                     type='text' 
//                     name='origin'
//                     value={inputs.origin || ""}
//                     onChange={handleChange}
//                 />
//               </div>
//             </div>

//             <div className='col-md-6 col-lg-4'>
//               <div className='form-group'>
//                 <label htmlFor='DESTINATION'>Destination</label>
//                 <br />
//                 <input 
//                     id='DESTINATION' 
//                     className='form-control' 
//                     type='text' 
//                     name='destination'
//                     value={inputs.destination || ""}
//                     onChange={handleChange}
//                 />
//               </div>
//             </div>
//           </div>
//           <button className='btn btn-primary' type='button' onClick={onClick}>
//             Build Route
//           </button>
//           {/* {directionsOptions.response !== null && (
//               <DirectionsAccordion directionsOptions={directionsOptions}/>
//           )} */}
//         </div>

//         <div className='map-container'>
//           <GoogleMap
//             id='direction-example'
//             mapContainerStyle={{
//               height: '400px',
//               width: '100%'
//             }}
//             zoom={10}
//             center={center}
//             onClick={onMapClick}
//             // onLoad={map => {
//             //   console.log('DirectionsRenderer onLoad map: ', map)
//             // }}
//             // onUnmount={map => {
//             //   console.log('DirectionsRenderer onUnmount map: ', map)
//             // }}
//           >
            // {stopsObj.map((stopObj) => (
            //     <MarkerF  
            //         key={stopObj.key}
            //         position={{ lat: stopObj.value.stop_lat, lng: stopObj.value.stop_lng}} 
            //         onClick={() => {
            //             setSelected(stopObj);
            //             console.log(stopObj);
            //         }}
            //         visible={true}
            //     />
            // ))}
            // {selected ? (
            //                 <InfoWindowF
            //                     selected={selected}
            //                     position={{ lat: selected.value.stop_lat, lng: selected.value.stop_lng }} 
            //                     onCloseClick={() => {
            //                         setSelected(null);
            //                     }}
            //                 >
            //                     <div>
            //                         <h2>{selected.value.stop_name}</h2>
            //                         <p>Category: {selected.value.stop_category}</p>
            //                         {/* <button onClick={(stobObj) => {addStopToRoute(stopObj)}}>Add to Route</button> */}
            //                         <button onClick={onClick}>Add to Route</button>
            //                     </div>
            //                 </InfoWindowF>
            //             ) : null
            // }

//             {
//               (
//                 directionsOptions.destination !== '' &&
//                 directionsOptions.origin !== ''
//               ) && (
//                 <DirectionsService
//                   options={{ 
//                     destination: directionsOptions.destination,
//                     origin: directionsOptions.origin,
//                     travelMode: 'DRIVING',
//                     waypoints: directionsOptions.waypoints
//                   }}
//                   callback={directionsCallback}
//                   onLoad={directionsService => {
//                     // console.log('DirectionsService onLoad directionsService: ', directionsService);
//                     console.log("dO DirectionsService:", directionsOptions);
//                   }}
//                   // onUnmount={directionsService => {
//                   //   console.log('DirectionsService onUnmount directionsService: ', directionsService)
//                   // }}
//                 /> 
//               )
//             }
//             {/* {
//               (
//                 directionsOptions.destination !== '' &&
//                 directionsOptions.origin !== ''
//               ) && (
//                 <DistanceMatrixService 
//                   options={{
//                       destinations: [directionsOptions.destination, {lat:37.297817, lng:-113.028770}],
//                       origins: [directionsOptions.origin, {lat:37.297817, lng:-113.028770}],
//                       travelMode: 'DRIVING',
//                   }}
//                   // callback = {(response) => {console.log('DMS:',response)}}
//                   callback = {(response) => {
//                     setDistanceMatrixOptions( () => ({
//                       response: response,
//                       origins: response.originAddresses,
//                       destinations: [inputs.destination],
//                       travelMode: 'DRIVING'
//                     }));
//                     console.log('DMS:',response);
//                     console.log('distanceMatrixOptions:', distanceMatrixOptions)
//                   }}
//                 />
//               )
//             } */}
//             {
//               directionsOptions.response !== null && (
//                 <DirectionsRenderer
//                   options={{ 
//                     directions: directionsOptions.response
//                   }}
//                   onLoad={directionsRenderer => {
//                     // console.log('DirectionsRenderer onLoad directionsRenderer: ', directionsRenderer);
//                     console.log('dO DirectionsRenderer:', directionsOptions);
//                   }}
//                   // onUnmount={directionsRenderer => {
//                   //   console.log('DirectionsRenderer onUnmount directionsRenderer: ', directionsRenderer)
//                   // }}
//                 />
//               )
//             }
//           </GoogleMap>
//         </div>
//       </div>
//     )
  
// }

// CURRENT:
import { GoogleMap, DirectionsService, DirectionsRenderer, DistanceMatrixService, useJsApiLoader, MarkerF, InfoWindowF } from "@react-google-maps/api";
import { React, useCallback, useEffect, useRef, useState } from "react";
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
  } from "@reach/accordion";
import "@reach/accordion/styles.css";

const Directions = props => {
  const [directions, setDirections] = useState();
  const [panel, setPanel] = useState();
  const { origin, destination, waypoints } = props;
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
      count.current += 1;
      setDirections(result);
      console.log(directions);
      console.log(result);
    }
  };
  console.log(directions);

  return (
     <div className="Directions">
      {/* <div className="DirectionsAccordion">
      <DirectionsAccordion origin={origin} destination={destination} waypoints={waypoints} directions={directions} />
      </div> */}
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
        {directions && (
          <DirectionsRenderer 
            directions={directions} 
            options={options} 
            panel={ document.getElementById('panel') }/>
        )}
        {/* <div id="panel"></div> */}
    </div>
  );
};

const center = {
  lat: 37.733795, 
  lng: -122.446747
};

export default function RouteMap () {
  const [libraries] = useState(['places']);
  const [inputs, setInputs] = useState({});
  const [mapData, setMapData] =useState([]);
  const [selected, setSelected] = useState(null);
  let [selectedWaypoints, setSelectedWaypoints] = useState([]);
  let [origin, setOrigin] = useState('');
  let [destination, setDestination] = useState('');
  let [waypoints, setWaypoints] = useState([]);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey:process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries
  });

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

  function addRouteClick () {
    let selectedWaypoint = {
      location: {
        lat: selected.value.stop_lat,
        lng: selected.value.stop_lng
      },
      stopover: true,
    };
    setWaypoints(waypoints => [...waypoints, selectedWaypoint]);
    setSelectedWaypoints(selectedWaypoints => [...selectedWaypoints, selected]);
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
            origin !== '' && (
              <DirectionsAccordion origin={origin} destination={destination} waypoints={selectedWaypoints} />
            )
          }
        </div>
        {
          origin !== '' ?
        
        (<GoogleMap
        id='direction-example'
        mapContainerStyle={{
          height: '400px',
          width: '500px'
        }}
        zoom={10}
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
            <Directions origin={origin} destination={destination} waypoints={waypoints} />
          )}
          {stopsObj.map((stopObj) => (
                <MarkerF  
                    key={stopObj.key}
                    position={{ lat: stopObj.value.stop_lat, lng: stopObj.value.stop_lng}} 
                    onClick={() => {
                        setSelected(stopObj);
                        console.log(stopObj);
                    }}
                    visible={true}
                />
            ))}
            {selected ? (
                            <InfoWindowF
                                selected={selected}
                                position={{ lat: selected.value.stop_lat, lng: selected.value.stop_lng }} 
                                onCloseClick={() => {
                                    setSelected(null);
                                }}
                            >
                                <div>
                                    <h2>{selected.value.stop_name}</h2>
                                    <p>Category: {selected.value.stop_category}</p>
                                    <button onClick={addRouteClick}>Add to Route</button>
                                </div>
                            </InfoWindowF>
                        ) : null
            }
      </GoogleMap>): null}
      <div id="panel"></div>
      </div>
    </div>
  );
};


function DirectionsAccordion ({ origin, destination, waypoints, directions }) {

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



