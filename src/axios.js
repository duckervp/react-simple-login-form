import axios from "axios";

const baseURL = "http://localhost:8762";

const Axios = axios.create({
  baseURL
});

export default Axios;