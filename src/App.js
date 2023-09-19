import {
  GoogleMap,
  useLoadScript,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api';
import { useRef, useState } from 'react';
const center = { lat: 9.93333, lng: -84.08333 };
const App = () => {
  const [map, setMap] = useState(/** @type google.maps.Map*/ (null));
  const [directionsResponse, setdirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destinationRef = useRef();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: '',
    libraries: ['places'],
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const calculateRoute = async () => {
    if (originRef.current.value === '' || destinationRef.current.value === '') {
      return;
    }

    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });

    setdirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  };

  const clearRoute = () => {
    setdirectionsResponse(null);
    setDistance('');
    setDuration('');
    originRef.current.value = '';
    destinationRef.current.value = '';
  };
  return (
    <div>
      <Autocomplete>
        <input width="100%" ref={originRef} />
      </Autocomplete>
      <Autocomplete>
        <input width="100%" ref={destinationRef} />
      </Autocomplete>
      <button onClick={calculateRoute}>Calculate Route</button>
      <p>Distance: {distance}</p>
      <p>Duration: {duration}</p>
      <button onClick={clearRoute}>Clear Route</button>
      <button onClick={() => map.panTo({ lat: 9.93333, lng: -84.08333 })}>
        Center
      </button>
      <GoogleMap
        zoom={15}
        center={center}
        mapContainerStyle={{ height: '90vh', width: '100%' }}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
        onLoad={(map) => setMap(map)}
      >
        <Marker position={{ lat: 9.93333, lng: -84.08333 }} />
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
      </GoogleMap>
    </div>
  );
};

export default App;
// import { useJsApiLoader } from '@react-google-maps/api';

// const center = {
//   lat: 9.93333,
//   lng: -84.08333,
// };

// const App = () => {
//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: 'AIzaSyC2g5SeJFiX5j7GHJjDHCq0UIfCsatS0Jk',
//   });

//   if (!isLoaded) {
//     return <h1>Cargando</h1>;
//   }

//   return (
//     <>
//       <div
//         style={{ height: '1000px', width: '1000px', backgroundColor: 'red' }}
//       >
//         <h1>MAPA</h1>
//         <GoogleMap center={center} zoom={10}></GoogleMap>
//       </div>
//     </>
//   );
// };

// export default App;
