import { useState, useEffect, useMemo, Fragment } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

import axios from "axios";

import { getAuthorization } from "../utils/apiHelper";

const Map = () => {
  const [customerAddresses, setCustomers] = useState(null);
  const [markerLocations, setMarkerLocations] = useState(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const center = useMemo(() => ({ lat: 41.5, lng: -99 }), []);

  const getCustomerAddresses = async () => {
    const response = await axios.get(
      `https://api.commerce7.com/v1/customer-address`,
      {
        headers: {
          Authorization: `Basic ${getAuthorization()}`,
          tenant: "jacob-sandbox-account",
        },
      }
    );
    setCustomers(response.data.customerAddresses);
  };

  const getMarkerLocations = async (customerAddresses) => {
    const requests = customerAddresses.map((customerAddress) => {
      const { address, city, stateCode } = customerAddress;
      const addressString = `${address} ${city} ${stateCode}`;
      return axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          addressString
        )}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
      );
    });
    const locationsRaw = await Promise.all(requests);
    // console.log(locationsRaw);
    const locations = locationsRaw.map(
      (location) => location.data.results[0]?.geometry.location
    );
    setMarkerLocations(locations);
  };

  useEffect(() => {
    getCustomerAddresses();
  }, []);

  useEffect(() => {
    if (customerAddresses && !markerLocations) {
      getMarkerLocations(customerAddresses);
    }
  }, [customerAddresses, markerLocations]);

  if (!markerLocations || !isLoaded) return null;

  console.log(markerLocations);

  return (
    <GoogleMap zoom={4} center={center} mapContainerClassName="map-container">
      {markerLocations.map((location, index) => (
        <Fragment key={`${index}-${Math.random()}`}>
          {!!location && <Marker position={location} />}
        </Fragment>
      ))}
    </GoogleMap>
  );
};

export default Map;
