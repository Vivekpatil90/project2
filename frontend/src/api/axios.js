import axios from "axios";
export default axios.create({
  baseURL: import.meta.env.VITE_API_URL,  // for Vite
  // baseURL: process.env.REACT_APP_API_URL,  // for CRA
  withCredentials: true,
});
