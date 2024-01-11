import axios from 'axios';


// Membuat instance Axios
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_API,
});


export default instance;