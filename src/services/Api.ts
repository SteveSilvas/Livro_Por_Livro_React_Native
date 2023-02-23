import axios from "axios";


// const serviceURL = process.env.REACT_APP_SERVICE_URL;
const localURL = "http://127.0.0.1:4200";

const api = axios.create({
    baseURL: localURL});

export default api;