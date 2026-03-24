import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

// export const getGroups = async (params?: any) => {
//   const res = await axios.get(`${BASE_URL}/api/groupchats/`, {
//     params, // filters like city, subject etc
//   });

// //   console.log("the data from api file", res.data)
//   return res.data;
// };


export const getGroups = async (params?: any) => {
  console.log("Fetching groups with params:", params);
  const res = await axios.get(`${BASE_URL}/api/groupchats`, {
    params,
  });

  // console.log("Received response from API:", res.data);
  return res.data;
};


export const getFilters = async () => {
  const res = await axios.get(`${BASE_URL}/api/groupchats/filters`);
  console.log("Received filters from API:", res.data);
  return res.data;
};