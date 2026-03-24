import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getGroups = async (params?: any) => {
  const res = await axios.get(`${BASE_URL}/api/groupchats`, {
    params,
  });

  return res.data;
};

export const getFilters = async () => {
  const res = await axios.get(`${BASE_URL}/api/groupchats/filters`);
  return res.data;
};