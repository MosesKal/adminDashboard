import axios from "axios";

  //export  const apiBaseUrl = "http://localhost:8000";

  export  const apiBaseUrl = "https://api.fikiri.co";
  //export const apiBaseUrl = "",
  //baseURL: "https://fikiri-solutions.com",

  export default axios.create(
      {
        baseURL: apiBaseUrl,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials : true,
      }
  );
