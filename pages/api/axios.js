import axios from "axios";

//export  const apiBaseUrl = "http://localhost:8000";
export const apiBaseUrl = "https://api.fikiri.co";

export default axios.create(
    {
        baseURL: apiBaseUrl,
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
    }
);

