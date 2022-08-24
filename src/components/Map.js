import { useState, useEffect, useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

import axios from "axios";

const Map = () => {
  const [customers, setCustomers] = useState(null);
  const [total, setTotal] = useState(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const center = useMemo(() => ({ lat: 44, lng: -80 }), []);

  const getCustomerAddresses = async () => {
    const response = await axios.get(`https://api.commerce7.com/v1/customer`, {
      headers: {
        Authorization: `Basic ${process.env.REACT_APP_API_AUTH}`,
        tenant: "jacob-sandbox-account",
      },
    });
    setCustomers(response.data.customers);
    setTotal(response.data.total);
  };

  useEffect(() => {
    getCustomerAddresses();
  }, []);

  if (!customers || !isLoaded) return null;

  console.log(customers);

  return (
    <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
      <Marker position={{ lat: 44, lng: -80 }} />
    </GoogleMap>
  );
};

export default Map;
