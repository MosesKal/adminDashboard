import axios from "@/pages/api/axios";

export const GET_POLES = "GET_POLES";
export const ADD_POLE = "ADD_POLE";
export const UPDATE_POLE = "UPDATE_POLE";

export const getPoles = () => async (dispatch) => {
  try {
    const response = await axios.get("/poles");
    dispatch({ type: GET_POLES, payload: response?.data?.data });
  } catch (error) {
    console.error(error);
  }
};

