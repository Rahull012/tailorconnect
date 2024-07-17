import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import "leaflet/dist/leaflet.css";
import "./Test.css";
import { Icon } from "leaflet";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const UserPage = () => {
  const [userLocation, setUserLocation] = useState({ latitude: null, longitude: null });
  const [nearbyTailors, setNearbyTailors] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    // Function to get user's geolocation
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
          },
          (error) => {
            console.error('Error getting user location:', error);
          }
        );
      }
    };

    getUserLocation();
  }, []);

  useEffect(() => {
    const fetchdetails = async () => {
      try{
        const response=await axios.get('http://localhost:5000/api/nearbytailors', {
          params: {
            latitude: userLocation.latitude,
            longitude: userLocation.longitude
          }
        });
        console.log(response.data.data);
        setNearbyTailors(response.data.data);
      }
      catch(err){
        console.log(err);
      }
  }
  fetchdetails();
  }, [userLocation]);


    const customMarker = new Icon({
      iconUrl:"data:image/png;base64,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",
        iconSize: [25, 25],
        iconAnchor: [10, 10],
        popupAnchor: [0, -10]
    })

    const customMarker2 = new Icon({
      iconUrl:"https://w7.pngwing.com/pngs/244/287/png-transparent-google-map-maker-pin-computer-icons-google-maps-map-icon-angle-black-map-thumbnail.png",
        iconSize: [25, 25],
        iconAnchor: [10, 10],
        popupAnchor: [0, -10]
    })
  
  

  return (
    <div className="map-container">
      <MapContainer center={[userLocation.latitude || 0, userLocation.longitude || 0]} zoom={13} className="map">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Add marker for user's location */}
        <Marker position={[userLocation.latitude || 0, userLocation.longitude || 0]} icon={customMarker} >
          <Popup>Your current location</Popup>
        </Marker>
         
        {Array.isArray(nearbyTailors) && nearbyTailors.length > 0 && nearbyTailors.map((tailor) => (
        <Marker key={tailor._id} position={[tailor.location.latitude, tailor.location.longitude]} icon={customMarker2}>
        <Popup>{tailor.name}  <br/>  <Link to={`/ratings/${tailor.name}/${tailor.email}/${tailor.Number}`}>View Details</Link></Popup>
          
          {/* address phone instagram link ratings */}
        </Marker>
      ))}
        
      </MapContainer>
    </div>
  );
};

export default UserPage;
