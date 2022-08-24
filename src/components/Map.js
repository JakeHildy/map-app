import { useState, useEffect } from "react";
import axios from "axios";

const Map = () => {
  const [customers, setCustomers] = useState(null);
  const [total, setTotal] = useState(null);

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

  if (!customers) return null;

  console.log(customers);

  return <div>Map</div>;
};

export default Map;
