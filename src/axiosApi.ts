import axios from "axios";

const axiosAPI = axios.create({
  baseURL:
    "https://almaz-server-default-rtdb.europe-west1.firebasedatabase.app/",
});

export default axiosAPI;
